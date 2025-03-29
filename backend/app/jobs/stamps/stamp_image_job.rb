require "open-uri"
require "image_processing/mini_magick"

class OpenaiServiceError < StandardError; end

class Stamps::StampImageJob < ApplicationJob
  queue_as :default

  retry_on ActiveRecord::RecordNotFound, wait: 5.seconds, attempts: 3
  retry_on OpenaiServiceError, wait: 5.seconds, attempts: 3

  def perform(*args)
    stamp_id = args[0]
    stamp = Stamp.find(stamp_id)

    stamp_url = Stamps::OpenaiService.new.generate_stamp
    
    raise(OpenaiServiceError) if stamp_url.nil?

    stamp_file = URI.open(stamp_url)
    resized_stamp = ImageProcessing::MiniMagick.source(stamp_file).resize_to_fit(500, 500).call
    stamp.image.attach(io: stamp_file, filename: "stamp-#{SecureRandom.hex(8)}.png")
  end
end