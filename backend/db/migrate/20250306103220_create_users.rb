class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :image_url
      t.text :profile
      t.boolean :deleted, null: false, default: false
      t.integer :reword_total, null: false, default: 0
      
      t.timestamps
    end
  end
end
