class Api::V1::BattlesController < ApplicationController
  before_action :authenticate_user!

  # 使用想定画面: 対戦検索画面
  def index
    page = params[:page] || 0  
    per_page = params[:per_page] || 10

    status_params = params[:status] || "waiting"
    category_params = params[:category]
    level_params = params[:level]
    order_params = params[:order]
    query_params = params[:q]

     # 条件 : 自分がホストではない、かつ、自分が参加していない、かつ、バトルのステータスがwaitingのもののみ取得
    paticipainted_battle_ids = BattleParticipant.where(user_id: current_user.id).pluck(:battle_id)
    @battles = Battle.joins(:battle_history, :categories)
                    .preload(:battle_history, :categories)
                    .where.not(id: paticipainted_battle_ids)
                    .where(battle_histories: { status: status_params })
                    .page(page)
                    .per(per_page)

    # カテゴリーが指定されている場合
    @battles = @battles.where(categories: { name: category_params }).distinct if category_params.present?

    # レベルが指定されている場合
    @battles = @battles.where(level: level_params).distinct if level_params.present?
   
    # ソート順が指定されている場合
    @battles = @battles.order(created_at: order_params).distinct if order_params.present? && order_params.in?(%w(asc desc))

    # 検索ワードが指定されている場合
    @battles = @battles.where("title LIKE :query OR detail LIKE :query", query: "%#{query_params}%").distinct if query_params.present?

  end

  # 使用想定画面: 対戦詳細画面
  def show
    @battle = Battle.find_by(id: params[:id])

    return render_404("バトルが見つかりません") unless @battle
  end

  def create
    return render_422 unless battle_params

    categories = battle_params[:categories]
    achievement_rate = battle_params[:achievement_rate].to_i / 100.0
    battle_start_date = battle_params[:battle_start_date]
    battle_end_date = battle_params[:battle_end_date]
    participant_limit = battle_params[:participant_limit]
    battle_title = battle_params[:title]
    battle_detail = battle_params[:detail]

    fixed_damage = 50
    battle_period = create_battle_period(battle_start_date, battle_end_date)

    return render_422("バトル期間は2日以上8日未満で設定してください") unless battle_period

    # 報酬の設定
    # 計算式 : ユーザ固定のダメージ50 ✖️ 期間 ✖️ 達成率
    per_reword = create_per_reword(fixed_damage, battle_period, achievement_rate)

    # 難易度の設定 最大値: 750 最小値: 75
    # 計算式 : 報酬 * AIによる5段階難易度
    battle_input = { title: battle_title, detail: battle_detail, period: battle_period, archievement_rate: achievement_rate * 100 }
    level_five_rate = Battles::OpenaiService.new.create_five_rate(battle_input)
    return render_422("AIによる難易度の取得に失敗しました") unless level_five_rate
    level = create_level(per_reword, level_five_rate)

    ActiveRecord::Base.transaction do
      @battle = Battle.create!(
        title: battle_title,
        apply_start_date: battle_params[:apply_start_date],
        apply_end_date: battle_params[:apply_end_date],
        battle_start_date: battle_start_date,
        battle_end_date: battle_end_date,
        detail: battle_detail,
        achievement_rate: battle_params[:achievement_rate],
        participant_limit: participant_limit,
        per_reword: per_reword,
        level: level,
        host_user_id: current_user.id
      )

      BattleHistory.create!(
        battle: @battle
      )

      BattleParticipant.create!(
        user: current_user,
        battle: @battle
      )

      categories.each do |category|
        BattleCategory.create!(
          battle: @battle,
          category_id: Category.find_by(name: category[:name]).id
        )
      end
    end

    # バトルのステータスをアクティブに更新するジョブを登録
    return render_422("バトルが存在しません") unless @battle
    Battles::UpdateStatusJob.set(wait_until: @battle.battle_start_date).perform_later(@battle.id)

    # バトルのステータスを終了に更新するジョブを登録
    Battles::UpdateCompletedJob.set(wait_until: @battle.battle_end_date).perform_later(@battle.id)
  end

  def update
    battle = current_user.battles.find_by(id: params[:id])

    return render_404("バトルが見つかりません") unless battle

    categories = battle_params[:categories]
    achievement_rate = battle_params[:achievement_rate].to_i / 100.0
    battle_start_date = battle_params[:battle_start_date]
    previous_start_date = battle.battle_start_date
    battle_end_date = battle_params[:battle_end_date]
    previous_end_date = battle.battle_end_date
    participant_limit = battle_params[:participant_limit]
    battle_title = battle_params[:title]
    battle_detail = battle_params[:detail]

    fixed_damage = 50
    battle_period = create_battle_period(battle_start_date, battle_end_date)
    old_battle_period = create_battle_period(battle.battle_start_date.to_s, battle.battle_end_date.to_s)

    return render_422("バトル期間は2日以上8日未満で設定してください") unless battle_period

    per_reword = create_per_reword(fixed_damage, battle_period, achievement_rate)
    
    # タイトル or 詳細 or バトル期間が変更された場合、AIによる5段階難易度を再計算
    if battle.title != battle_title || battle.detail != battle_detail || old_battle_period != battle_period
      battle_input = { title: battle_title, detail: battle_detail, period: battle_period, archievement_rate: achievement_rate * 100 }
      level_five_rate = Battles::OpenaiService.new.create_five_rate(battle_input)
      return render_422("AIによる難易度の取得に失敗しました") unless level_five_rate
      level = create_level(per_reword, level_five_rate)
    else
      level = battle.level
    end

    ActiveRecord::Base.transaction do
      updated_battle = battle.update!(
        title: battle_title,
        apply_start_date: battle_params[:apply_start_date],
        apply_end_date: battle_params[:apply_end_date],
        battle_start_date: battle_start_date,
        battle_end_date: battle_end_date,
        detail: battle_detail,
        achievement_rate: battle_params[:achievement_rate],
        participant_limit: participant_limit,
        per_reword: per_reword,
        level: level,
      )

      battle.battle_categories.destroy_all unless battle.battle_categories.empty?
      categories.each do |category|
        BattleCategory.create!(
          battle: battle,
          category_id: Category.find_by(name: category[:name]).id
        )
      end
    end

    # バトルの開始日に変更があった場合にジョブを更新
    if previous_start_date != battle_start_date && battle.id
      Battles::EditJob.perform_later(battle.id, battle_start_date)
    end

    # バトルの終了日に変更があった場合にジョブを更新
    if previous_end_date != battle_end_date && battle.id
      Battles::EditEndDateJob.perform_later(battle.id, battle_end_date)
    end
  end

  def destroy
    battle = current_user.battles.find_by(id: params[:id])
    return render_404("バトルが見つかりません") unless battle

    battle_id = battle.id
    battle.destroy

    # バトルのステータスを更新するジョブを削除
    Battles::DeleteJob.perform_later(battle_id)
  end

  private
    def battle_params
      params.permit(
        :title, 
        :apply_start_date, 
        :apply_end_date, 
        :battle_start_date, 
        :battle_end_date, 
        :detail, 
        :achievement_rate, 
        :participant_limit, 
        :backimage_image,
        categories: [:id, :name]
      )
    end

    def create_battle_period(battle_start_date, battle_end_date)
      start_date = Time.zone.parse(battle_start_date)
      end_date = Time.zone.parse(battle_end_date)
      one_day = 60 * 60 * 24

      return unless start_date && end_date

      period = (end_date - start_date) / one_day
      return period if period > 2 && period < 8 # 2日以上8日未満
    end

    def create_per_reword(fixed_damage, battle_period, achievement_rate)
      (fixed_damage * battle_period * achievement_rate).round.to_i
    end

    def create_level(per_reword, level_five_rate)
      five_rate = { "1" => 1, "2" => 1.2, "3" => 1.5, "4" => 1.7, "5" => 2 }
      
      level_rate = { 
        "E" => 75, 
        "D" => 150, 
        "C" => 300, 
        "B" => 450, 
        "A" => 600, 
        "AA" => 675, 
        "AAA" => 700, 
        "S" => 725, 
        "SS" => 740, 
        "SSS" => 750 
      }

      level_number = per_reword * five_rate[level_five_rate]
      level_rate.each { | key, value | break key if value >= level_number }
    end
end
