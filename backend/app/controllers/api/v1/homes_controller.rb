class Api::V1::HomesController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @active_battles = current_user.battles.joins(:battle_history).preload(:battle_history).where(battle_histories: { status: "active" })
    @waiting_battles = current_user.battles.joins(:battle_history).preload(:battle_history).where(battle_histories: { status: "waiting" })
  end
end
