class AddUniquenessToTables < ActiveRecord::Migration[8.0]
  def change
    add_index :battle_participants, [:user_id, :battle_id], unique: true, name: "index_battle_participants_on_user_id_and_battle_id_uniq"
    add_index :battle_progresses, [:user_id, :battle_id, :progress_date], unique: true, name: "index_user_battle_progress_date_uniq"
  end
end
