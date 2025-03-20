class AddUniqueIndexToBattleFavorites < ActiveRecord::Migration[8.0]
  def change
    add_index :battle_favorites, [:user_id, :battle_id], unique: true
  end
end
