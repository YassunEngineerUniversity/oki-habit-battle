class Battles::UpdateStatusJob < ApplicationJob
  queue_as :default

  def perform(*args)
    battle_id = args[0]
    per_bonus_rate = { "1" => 0, "2" => 0.2, "3" => 0.4, "4" => 0.6, "5" => 0.8 }

    battle = Battle.find_by(id: battle_id)

    # バトルが存在しない場合は、ジョブを終了する
    return unless battle

    achievement_rate = battle.achievement_rate / 100.0
    total_hp = (battle.per_reword * battle.participants.count * achievement_rate).to_i
    per_bonus = total_hp * per_bonus_rate[battle.participants.count.to_s]

    ActiveRecord::Base.transaction do
      battle.update!(total_hp: total_hp, per_bonus: per_bonus)
      battle.battle_history.update!(status: Status::ACTIVE)
    end
  end
end

