class NotFoundParameterError < StandardError; end
class NotFoundScheduledJobError < StandardError; end

class Battles::DeleteJob < ApplicationJob
  include DeletingScheduledJob
  queue_as :default

  retry_on NotFoundParameterError, wait: 5.seconds, attempts: 3
  retry_on NotFoundScheduledJobError, wait: 5.seconds, attempts: 3

  def perform(*args)
    raise NotFoundParameterError unless args[0]
    battle_id = args[0]

    delete_scheduled_job("Battles::UpdateStatusJob", battle_id)
    delete_scheduled_job("Battles::UpdateCompletedJob", battle_id)
  end
end
