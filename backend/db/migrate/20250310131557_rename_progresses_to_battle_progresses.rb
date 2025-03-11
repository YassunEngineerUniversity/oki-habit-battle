class RenameProgressesToBattleProgresses < ActiveRecord::Migration[8.0]
  def change
    rename_table :progresses, :battle_progresses
  end
end
