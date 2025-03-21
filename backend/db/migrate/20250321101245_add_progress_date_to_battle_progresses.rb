class AddProgressDateToBattleProgresses < ActiveRecord::Migration[8.0]
  def change
    add_column :battle_progresses, :progress_date, :datetime, null: false
  end
end
