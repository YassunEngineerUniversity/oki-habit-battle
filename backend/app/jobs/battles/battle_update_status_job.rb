class Battles::BattleUpdateStatusJob < ApplicationJob
  queue_as :default

  # 5秒後に再度実行する（最大2回まで、3となっているが最初の実行も含まれるため2回になる）
  retry_on ActiveRecord::RecordNotFound, wait: 5.seconds, attempts: 3

  def perform(*args)
    battle = Battle.find(args[0])
    battle.battle_history.update(status: "active")
  end
end

