class ChangeDefaultValueAchievementStatusToBattleHistories < ActiveRecord::Migration[8.0]
  def change
    change_column :battle_histories, :achievement_status, :string, null: true, default: nil
  end
end
