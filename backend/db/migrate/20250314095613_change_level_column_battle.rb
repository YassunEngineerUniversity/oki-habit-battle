class ChangeLevelColumnBattle < ActiveRecord::Migration[8.0]
  def change
    rename_column :battles, :max_level, :level
    remove_column :battles, :min_level, :string
  end
end
