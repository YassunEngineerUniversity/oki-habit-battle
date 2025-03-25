class NotFoundParameterError < StandardError; end
class NotFoundScheduledJobError < StandardError; end

class Battles::BattleDeleteJob < ApplicationJob
  queue_as :default

  retry_on NotFoundParameterError, wait: 5.seconds, attempts: 3
  retry_on NotFoundScheduledJobError, wait: 5.seconds, attempts: 3

  def perform(*args)
    raise NotFoundParameterError unless args[0]
    battle_id = args[0]

    scheduled_jobs = Sidekiq::ScheduledSet.new.scan("Battles::BattleUpdateStatusJob").select {|retri| retri.display_class == 'Battles::BattleUpdateStatusJob' }

    raise NotFoundScheduledJobError if scheduled_jobs.empty?

    scheduled_jobs.each do |job|
      job_battle_id = job["args"][0]["arguments"][0]
      if job_battle_id == battle_id
        job.delete
      end
    end
  end
end
