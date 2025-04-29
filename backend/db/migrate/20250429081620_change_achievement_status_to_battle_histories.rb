class ChangeAchievementStatusToBattleHistories < ActiveRecord::Migration[8.0]
  def change
    change_column :battle_histories, :achievement_status, :string
  end
end
