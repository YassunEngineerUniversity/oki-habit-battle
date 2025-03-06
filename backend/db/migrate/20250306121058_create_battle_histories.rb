class CreateBattleHistories < ActiveRecord::Migration[8.0]
  def change
    create_table :battle_histories do |t|
      t.string :status, null: false, default: 'waiting'
      t.references :battle, null: false, foreign_key: true
      t.timestamps
    end
  end
end
