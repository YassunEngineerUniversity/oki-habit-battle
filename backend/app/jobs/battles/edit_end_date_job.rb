class NotFoundParameterError < StandardError; end

class Battles::EditEndDateJob < ApplicationJob
  include DeletingScheduledJob

  queue_as :default
  retry_on NotFoundParameterError, wait: 5.seconds, attempts: 3
  retry_on NotFoundScheduledJobError, wait: 5.seconds, attempts: 3

  def perform(*args)
    raise NotFoundParameterError unless args[0] && args[1]
    battle_id = args[0]
    battle_end_date = Time.zone.parse(args[1])

    delete_scheduled_job("Battles::UpdateCompletedJob", battle_id)

    Battles::UpdateCompletedJob.set(wait_until: battle_end_date).perform_later(battle_id)
  end
end
