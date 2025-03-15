class AddColumsToBattle < ActiveRecord::Migration[8.0]
  def change
    add_column :battles, :participant_limit, :integer, null: false, default: 1
  end
end
