class Battles::UpdateCompletedJob < ApplicationJob
  queue_as :default

  # 5秒後に再度実行する（最大2回まで、3となっているが最初の実行も含まれるため2回になる）

  def perform(*args)
    battle_id = args[0]
    battle = Battle.find_by(id: battle_id)
    # バトルが存在しない場合は、ジョブを終了する
    return unless battle

    ActiveRecord::Base.transaction do
      battle.battle_history.update!(status: Status::COMPLETE)
    end
  end
end

