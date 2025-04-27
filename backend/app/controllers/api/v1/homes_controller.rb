class Api::V1::HomesController < ApplicationController
  before_action :authenticate_user!
  
  def index
    battles = Battle.joins(:battle_participants).preload(:battle_participants).where(battle_participants: { user_id: current_user.id })
    @active_battles = battles.joins(:battle_history).preload(:battle_history).where(battle_histories: { status: Status::ACTIVE }).order(created_at: :desc)
    @waiting_battles = battles.joins(:battle_history).preload(:battle_history).where(battle_histories: { status: Status::WAITING }).order(created_at: :desc)
    @today_stamp = current_user.stamps.find_by(generated_date: Time.zone.today)
    @is_today_stamp = @today_stamp.nil? || @today_stamp.obtained ? false : true
  end
end
