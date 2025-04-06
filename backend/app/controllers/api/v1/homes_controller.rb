class Api::V1::HomesController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @active_battles = current_user.battles.joins(:battle_history).preload(:battle_history).where(battle_histories: { status: Status::ACTIVE })
    @waiting_battles = current_user.battles.joins(:battle_history).preload(:battle_history).where(battle_histories: { status: Status::WAITING })
  end
end
