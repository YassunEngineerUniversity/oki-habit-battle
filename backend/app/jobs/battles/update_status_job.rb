class Battles::UpdateStatusJob < ApplicationJob
  queue_as :default

  # 5秒後に再度実行する（最大2回まで、3となっているが最初の実行も含まれるため2回になる）
  retry_on ActiveRecord::RecordNotFound, wait: 5.seconds, attempts: 3

  def perform(*args)
    battle = Battle.find(args[0])
    total_hp = (battle.per_reword * battle.participants.count * battle.achievement_rate).to_i

    per_bonus_rate = { "1" => 0, "2" => 0.2, "3" => 0.4, "4" => 0.6, "5" => 0.8 }
    per_bonus = total_hp * per_bonus_rate[battle.participants.count.to_s]

    battle.update(total_hp: total_hp, per_bonus: per_bonus)
    battle.battle_history.update(status: "active")
  end
end

