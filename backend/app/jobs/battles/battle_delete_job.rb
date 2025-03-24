class Battles::BattleDeleteJob < ApplicationJob
  queue_as :default

  def perform(*args)
    battle_id = args[0]

    scheduled_jobs = Sidekiq::ScheduledSet.new.scan("Battles::BattleUpdateStatusJob").select {|retri| retri.display_class == 'Battles::BattleUpdateStatusJob' }

    scheduled_jobs.each do |job|
      job_battle_id = job["args"][0]["arguments"][0]
      if job_battle_id == battle_id
        job.delete
      end
    end
  end
end
