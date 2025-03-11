class CreateBattleCategories < ActiveRecord::Migration[8.0]
  def change
    create_table :battle_categories do |t|
      t.references :battle, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true
      t.timestamps
    end
  end
end
