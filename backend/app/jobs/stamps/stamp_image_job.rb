require "open-uri"
require "image_processing/mini_magick"

class Stamps::StampImageJob < ApplicationJob
  queue_as :default

  def perform(*args)
    stamp = Stamp.find_by(id: args[0])
    if stamp
      # stamp_url = Stamps::OpenaiService.new.generate_stamp
      stamp_url = "https://zukan.pokemon.co.jp/zukan-api/up/images/index/8ac25cd367875f2ddafc63bd9e0081c4.png"
      stamp_file = URI.open(stamp_url)
      resized_stamp = ImageProcessing::MiniMagick.source(stamp_file).resize_to_fit(500, 500).call
      stamp.image.attach(io: stamp_file, filename: "stamp-#{SecureRandom.hex(8)}.png")
    end
  end
end