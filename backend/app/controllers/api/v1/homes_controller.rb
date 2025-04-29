class Api::V1::HomesController < ApplicationController
  before_action :authenticate_user!
  
  def index
    battles = Battle.joins(:battle_participants).preload(:battle_participants).where(battle_participants: { user_id: current_user.id })
    @active_battles = battles.left_outer_joins(:battle_history, :battle_progresses).preload(:battle_history, :battle_progresses).where(battle_histories: { status: Status::ACTIVE }).order(created_at: :desc).distinct
    today_complete_battles = @active_battles.where(battle_progresses: { user_id: current_user.id, progress_date: Time.zone.today })
    @today_task_battles = @active_battles.select { |battle|
      unless today_complete_battles.include?(battle)
        battle
      end
    }
    @waiting_battles = battles.joins(:battle_history).preload(:battle_history).where(battle_histories: { status: Status::WAITING }).order(created_at: :desc)
    @today_stamp = current_user.stamps.find_by(generated_date: Time.zone.today)
    @is_today_stamp = @today_stamp.nil? || @today_stamp.obtained ? false : true
  end
end
