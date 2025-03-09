class ChangeDeletedToDeletedAtInUsers < ActiveRecord::Migration[8.0]
  def change
    remove_column :users, :deleted, :boolean
    add_column :users, :deleted_at, :datetime, default: nil
  end
end
