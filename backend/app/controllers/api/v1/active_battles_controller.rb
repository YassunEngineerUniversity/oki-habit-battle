class Api::V1::ActiveBattlesController < ApplicationController
  before_action :authenticate_user!

  def show
    @active_battle = Battle.find_by(id: params[:id])
    return render_404("バトルが見つかりません") unless @active_battle
    return render_422("バトルがアクティブではありません") if @active_battle.battle_history.status != "active"
    return render_422("バトルに参加していません") unless @active_battle.battle_participants.pluck(:user_id).include?(current_user.id)

    
  end
end
