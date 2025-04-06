class Api::V1::HomesController < ApplicationController
  before_action :authenticate_user!
  
  def index
    battles = Battle.joins(:battle_participants).preload(:battle_participants).where(battle_participants: { user_id: current_user.id })
    @active_battles = battles.joins(:battle_history).preload(:battle_history).where(battle_histories: { status: Status::ACTIVE })
    @waiting_battles = battles.joins(:battle_history).preload(:battle_history).where(battle_histories: { status: Status::WAITING })
  end
end
