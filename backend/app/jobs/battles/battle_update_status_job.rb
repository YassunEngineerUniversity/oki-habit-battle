class Battles::BattleUpdateStatusJob < ApplicationJob
  queue_as :default

  def perform(*args)
    battle = Battle.find_by(id: args[0])
    battle.battle_history.update(status: "active")

    puts "バトルのステータスを更新しました"
  end
end
