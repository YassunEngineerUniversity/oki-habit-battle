class Battles::BattleUpdateJob < ApplicationJob
  queue_as :default

  def perform(*args)
    battle_id = args[0]
    battle_start_date = Time.zone.parse(args[1])

    scheduled_jobs = Sidekiq::ScheduledSet.new.scan("BattleUpdateStatusJob").select {|retri| retri.display_class == 'BattleUpdateStatusJob' }
    scheduled_jobs.each do |job|
      job_battle_id = job["args"][0]["arguments"][0]
      if job_battle_id == battle_id
        job.delete
      end
    end

    Battles::BattleUpdateStatusJob.set(wait_until: battle_start_date).perform_later(battle_id)
  end
end
