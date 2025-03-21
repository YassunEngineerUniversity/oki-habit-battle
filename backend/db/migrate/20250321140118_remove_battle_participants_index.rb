class RemoveBattleParticipantsIndex < ActiveRecord::Migration[8.0]
  def change
    remove_index :battle_participants, name: "index_battle_participants_on_user_id_and_battle_id_uniq"
  end
end
