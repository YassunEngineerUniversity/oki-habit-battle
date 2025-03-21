class Api::V1::BattleProgressesController < ApplicationController
  before_action :authenticate_user!

  def create
    active_battles = Battle.joins(:battle_history).where(battle_histories: { status: "active" })
    battle = active_battles.find_by(id: battle_progpress_params[:battle_id])
    return render_404("バトルが見つかりません") unless battle

    new_battle_progress = BattleProgress.new(user: current_user, battle: battle, progress_date: Time.zone.today)
    return render_422("バトル進捗の作成に失敗しました") unless new_battle_progress.save
  end

  private
    def battle_progpress_params
      params.permit(:battle_id)
    end
end
