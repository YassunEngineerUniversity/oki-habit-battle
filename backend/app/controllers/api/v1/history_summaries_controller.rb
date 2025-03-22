class Api::V1::HistorySummariesController < ApplicationController
  before_action :authenticate_user!

  def show
    @reword_total = current_user.reword_total
    @battle_total_count = current_user.battles.count
    @progresses = current_user.battle_progresses

    weekly_progress = current_user.battle_progresses.weekly_progress(Time.zone.today.beginning_of_week, Time.zone.today.end_of_week)
    @weekly_progress_count = weekly_progress.select(:progress_date).distinct.count

    ordered_progresses = current_user.battle_progresses.select(:progress_date).order(progress_date: :asc).distinct
    @max_consecutive_progress = get_max_consecutive_progress(ordered_progresses)
  end

  private
    def get_max_consecutive_progress(ordered_progresses)
      return 0 if ordered_progresses.empty?

      max_consecutive_progress = 0
      consecutive_progress = 0
      previous_date = nil

      ordered_progresses.each_with_index do |progress, index|
        if previous_date.nil? || progress[:progress_date] == previous_date + 1.day
          consecutive_progress += 1
        else
          consecutive_progress = 0
        end

        previous_date = progress[:progress_date]
        max_consecutive_progress = [max_consecutive_progress, consecutive_progress].max
      end

      max_consecutive_progress
    end
end
