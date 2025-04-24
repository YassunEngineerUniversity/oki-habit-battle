class Api::V1::BattleProgressesController < ApplicationController
  before_action :authenticate_user!

  def create
    active_battles = Battle.joins(:battle_history).where(battle_histories: { status: Status::ACTIVE })
    battle = active_battles.find_by(id: battle_progpress_params[:battle_id])
    return render_404("バトルが見つかりません") unless battle
    
    new_battle_progress = BattleProgress.new(user: current_user, battle: battle, progress_date: Time.zone.today)
    return render_422("バトル進捗の作成に失敗しました") unless new_battle_progress.save

    hasStamp = current_user.stamps.where(generated_date: Time.zone.today).exists?

    unless hasStamp
      stamp = Stamp.create(user: current_user, generated_date: Time.zone.today)
      return render_422("スタンプの作成に失敗しました") unless stamp.persisted?
  
      # スタンプの画像を生成するジョブを非同期で実行
      Stamps::StampImageJob.perform_later(stamp.id)
  
      obtain_date = stamp.created_at + 1.day
      Stamps::StampUpdateObtainedJob.set(wait_until: obtain_date).perform_later(stamp.id)
    end
  end

  private
    def battle_progpress_params
      params.permit(:battle_id)
    end
end
