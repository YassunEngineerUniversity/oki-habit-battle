class Api::V1::ActiveBattlesController < ApplicationController
  before_action :authenticate_user!

  def show
    @active_battle = Battle.find_by(id: params[:id])
    return render_404("バトルが見つかりません") unless @active_battle
    return render_422("バトルが対戦中ではありません") if @active_battle.battle_history.status != Status::ACTIVE
    return render_422("バトルに参加していません") unless @active_battle.battle_participants.pluck(:user_id).include?(current_user.id)

    @active_battle_progress_count = @active_battle.battle_progresses.count
    @battle_period = (@active_battle.battle_end_date.to_date - @active_battle.battle_start_date.to_date).to_i
    per_total_hp = (@active_battle.total_hp || 0) / @active_battle.participants.count


    @active_battle_participants = @active_battle.battle_participants.map do |participant|
      user = User.find_by(id: participant.user_id)
      participant_progresses = user.battle_progresses.where(battle_id: @active_battle.id)

      per_current_hp = participant_progresses.count == 0 ? per_total_hp : per_total_hp * (participant_progresses.count / @battle_period)
      per_current_hp = 0 if per_current_hp < 0

      {
        user_id: participant.user_id,
        name: participant.user.name,
        avatar: participant.user.image_url,
        progress_count: participant_progresses.count,
      }
    end
  end
end
