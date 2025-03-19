class Battles::OpenaiService < ApplicationService
  def initialize
    @client = OpenAI::Client.new
  end

  def create_five_rate(battle_input)
    prompt = File.read(Rails.root.join("config/prompt/battles/level.txt"))
    response = @client.chat(
      parameters: {
        model: "gpt-4o-2024-08-06",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: 
            "習慣にしたい行動 : #{battle_input[:title]}" + 
            "習慣にしたい行動の詳細 : #{battle_input[:detail]}" + 
            "期間 : #{battle_input[:period]}日" + 
            "達成率 : #{battle_input[:archievement_rate]}%"
          }
        ],
        temperature: 0.7,
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "fave_rate_response",
            schema: {
              type: "object",
              properties: {
                five_rate: { type: "string" }
              },
              required: ["five_rate"],
              additionalProperties: false
            },
            strict: true
          }
        }
      }
    )

    isRefusal = response.dig("choices", 0, "message", "refusal")
    return nil if isRefusal

    parsed_response = JSON.parse(response.dig("choices", 0, "message", "content"))
    parsed_response["five_rate"]
  end
end