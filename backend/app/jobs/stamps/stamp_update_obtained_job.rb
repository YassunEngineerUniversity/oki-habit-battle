class Stamps::StampUpdateObtainedJob < ApplicationJob
  queue_as :default

  retry_on ActiveRecord::RecordNotFound, wait: 5.seconds, attempts: 3

  def perform(*args)
    stamp_id = args[0]
    stamp = Stamp.find(stamp_id)
    stamp.update(obtained: true)
  end
end