class AddAchievementStatusToHattleHistories < ActiveRecord::Migration[8.0]
  def change
    add_column :battle_histories, :achievement_status, :boolean, default: false, null: false
  end
end
