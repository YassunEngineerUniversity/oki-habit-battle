class Api::V1::BattlesController < ApplicationController
  before_action :authenticate_user!

  # 使用想定画面: 対戦検索画面
  def index
    page = params[:page] || 0  # 現在のページ
    per_page = params[:per_page] || 10 # 表示件数

    # パラメータの取得
    status_params = params[:status] || "waiting"
    category_params = params[:category]
    level_params = params[:level]
    order_params = params[:order]
    query_params = params[:q]

     # 条件 : 自分がhostではない、かつ、自分が参加していない、かつ、バトルのステータスがwaitingのもののみ取得
    paticipainted_battle_ids = BattleParticipant.where(user_id: current_user.id).pluck(:battle_id)
    @battles = Battle.joins(:battle_history, :categories)
                    .includes(:battle_history)
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
     # 処理の流れ
    # 1. パラメータのチェック
    # 2. 報酬の設定
    # 3. バトルHPの設定
    # 4. 難易度の設定
    # 5. バトルの作成
    # 6. バトル履歴の作成
    # 7. ホストユーザを参加者に追加
    # 8. カテゴリーの設定

    categories = params[:categories]
    achievement_rate = params[:achievement_rate].to_i
    battle_start_date = params[:battle_start_date]
    participant_limit = params[:participant_limit]
    battle_end_date = params[:battle_end_date]
    battle_title = params[:title]
    battle_detail = params[:detail]

    fixed_damage = 50
    battle_period = create_battle_period(battle_start_date, battle_end_date)
    participant_rate = { "1" => 1, "2" => 1.2, "3" => 1.5, "4" => 1.7, "5" => 2 }

    # 報酬の設定
    # 計算式 : ユーザ固定のダメージ50 ✖️ 期間 ✖️ 達成率
    reword = fixed_damage * battle_period * achievement_rate * participant_rate[participant_limit]

    # バトルHPの設定
    # 計算式 : ユーザ固定のダメージ50 ✖️ 期間 ✖️ 達成率
    total_hp = fixed_damage * battle_period * achievement_rate

    # 難易度の設定
    # 計算式 : 報酬 * AIによる5段階難易度（1倍、1.2倍、1.5倍、1.7倍、2倍）
    client = OpenAI::Client.new
    response = client.chat(
      parameters: {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "難易度を5段階で評価してください。返す値は評価した1〜5の数字だけ返してください。" },
          { role: "user", content: "行うこと : #{battle_title}" + "期間 : #{battle_period}日" + "詳細 : #{battle_detail}"}
        ],
        temperature: 0.7
      }
    )
    level_five_rate = response.dig("choices", 0, "message", "content")
    binding.pry
    # ActiveRecord::Base.transaction do

    # end

  end

  def update

  end

  def destroy

  end

  private
    def battle_params
      # 全てのパラメータがある場合のみ許可したいが、全て検証する必要があるか確認
      params.permit(:title, :apply_start_date, :apply_end_date, :battle_start_date, :battle_end_date, :detail, :achievement_rate, :categories, :participant_limit, :background_image)
    end

    def create_battle_period(battle_start_date, battle_end_date)
      start_date = Time.zone.parse(battle_start_date)
      end_date = Time.zone.parse(battle_end_date)
      one_day = 60 * 60 * 24

      period = (end_date - start_date) / one_day
      return period.to_i
    end
end
