class RenameParticipaintsToBattleParticipants < ActiveRecord::Migration[8.0]
  def change
    rename_table :participaints, :battle_participants
  end
end
