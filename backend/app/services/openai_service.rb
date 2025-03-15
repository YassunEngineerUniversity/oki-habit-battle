class OpenaiService < ApplicationService
  def initialize
    @client = OpenAI::Client.new
  end

  def create_five_rate(battle_title, battle_period, battle_detail)
    response = @client.chat(
      parameters: {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "難易度を5段階で評価してください。返す値は評価した1〜5の数字だけ返してください。" },
          { role: "user", content: "行うこと : #{battle_title}" + "期間 : #{battle_period}日" + "詳細 : #{battle_detail}"}
        ],
        temperature: 0.7
      }
    )
    response.dig("choices", 0, "message", "content")
  end
end