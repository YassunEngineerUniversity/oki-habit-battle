class NotFoundParameterError < StandardError; end

class Battles::EditJob < ApplicationJob
  include DeletingScheduledJob

  queue_as :default
  retry_on NotFoundParameterError, wait: 5.seconds, attempts: 3
  retry_on NotFoundScheduledJobError, wait: 5.seconds, attempts: 3

  def perform(*args)
    raise NotFoundParameterError unless args[0] && args[1]
    battle_id = args[0]
    battle_start_date = Time.zone.parse(args[1])

    delete_scheduled_job("Battles::UpdateStatusJob", battle_id)

    Battles::UpdateStatusJob.set(wait_until: battle_start_date).perform_later(battle_id)
  end
end
