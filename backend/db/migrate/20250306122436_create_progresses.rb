class CreateProgresses < ActiveRecord::Migration[8.0]
  def change
    create_table :progresses do |t|
      t.references :user, null: false, foreign_key: true
      t.references :battle, null: false, foreign_key: true
      t.timestamps
    end
  end
end
