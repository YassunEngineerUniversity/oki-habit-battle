class AddColumsQueryToCategories < ActiveRecord::Migration[8.0]
  def change
    add_column :categories, :query, :string, null: false
  end
end
