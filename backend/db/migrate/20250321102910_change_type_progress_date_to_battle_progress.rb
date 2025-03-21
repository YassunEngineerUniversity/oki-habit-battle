class ChangeTypeProgressDateToBattleProgress < ActiveRecord::Migration[8.0]
  def change
    change_column :battle_progresses, :progress_date, :date, null: false
  end
end
