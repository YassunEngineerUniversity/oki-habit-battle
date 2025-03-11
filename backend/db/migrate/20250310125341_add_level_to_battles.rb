class AddLevelToBattles < ActiveRecord::Migration[8.0]
  def change
    add_column :battles, :level, :string
  end
end
