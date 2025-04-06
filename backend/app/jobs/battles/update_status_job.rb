class Battles::UpdateStatusJob < ApplicationJob
  queue_as :default

  def perform(*args)
    battle_id = args[0]
    battle = Battle.find_by(battle_id)

    # バトルが存在しない場合は、ジョブを終了する
    return unless battle

    total_hp = (battle.per_reword * battle.participants.count * battle.achievement_rate).to_i

    per_bonus_rate = { "1" => 0, "2" => 0.2, "3" => 0.4, "4" => 0.6, "5" => 0.8 }
    per_bonus = total_hp * per_bonus_rate[battle.participants.count.to_s]

    ActiveRecord::Base.transaction do
      battle.update!(total_hp: total_hp, per_bonus: per_bonus)
      battle.battle_history.update!(status: Status::ACTIVE)
    end
  end
end

