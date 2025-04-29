class Battles::UpdateCompletedJob < ApplicationJob
  queue_as :default

  def perform(*args)
    battle_id = args[0]
    battle = Battle.find_by(id: battle_id)
    # バトルが存在しない場合は、ジョブを終了する
    return unless battle

    # バトルのHPが0以下の場合、参加者に報酬を付与する
    if !battle.total_hp.nil? && battle.total_hp <= 0
      ActiveRecord::Base.transaction do
        battle.battle_history.update!(status: Status::COMPLETE, achievement_status: Status::SUCCESS)
        battle.participants.each do |participant|
          user = User.find_by(id: participant.user_id)
          per_bonus = battle.per_bonus.nil? ? 0 : battle.per_bonus
          per_reword = battle.per_reword.nil? ? 0 : battle.per_reword
          reword_total = per_reword + per_bonus
  
          user.update!(reword_total: user.reword_total + reword_total)
        end
      end
    else
      battle.battle_history.update!(status: Status::COMPLETE, achievement_status: Status::FAILURE)
    end
  end
end

