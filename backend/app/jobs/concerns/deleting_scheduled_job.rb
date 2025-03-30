module DeletingScheduledJob
  class NotFoundScheduledJobError < StandardError; end
  private
    def delete_scheduled_job(display_class, battle_id)
      scheduled_jobs = Sidekiq::ScheduledSet.new.scan(display_class).select {|retri| retri.display_class == display_class }

      raise NotFoundScheduledJobError if scheduled_jobs.empty?

      scheduled_jobs.each do |job|
        job_battle_id = job["args"][0]["arguments"][0]
        if job_battle_id == battle_id
          job.delete
        end
      end
    end
end