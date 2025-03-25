class Stamps::OpenaiService < ApplicationService
  def initialize
    @client = OpenAI::Client.new
  end

  def generate_stamp
    prompt = File.read(Rails.root.join("config/prompt/stamps/generate.txt"))

    response = @client.images.generate(
      parameters: {
        prompt: prompt,
        model: "dall-e-3",
        size: "1024x1024",
        quality: "standard",
        response_format: "url"
      }
    )

    isRefusal = response.dig("choices", 0, "message", "refusal")
    return nil if isRefusal

    response.dig("data", 0, "url")
  end
end