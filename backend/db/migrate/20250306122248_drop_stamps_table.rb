class DropStampsTable < ActiveRecord::Migration[8.0]
  def change
    drop_table :stamps
    drop_table :progresses
  end
end
