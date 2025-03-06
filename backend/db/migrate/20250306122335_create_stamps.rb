class CreateStamps < ActiveRecord::Migration[8.0]
  def change
    create_table :stamps do |t|
      t.string :image_url
      t.boolean :obtained, null: false, default: false
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
