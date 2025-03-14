class ChangeColumnBattle < ActiveRecord::Migration[8.0]
  def change
    # per_bonusカラムを追加（型は必要に応じて変更してください）
    add_column :battles, :per_bonus, :integer

    # rewordカラムをper_rewordに名称変更
    rename_column :battles, :reword, :per_reword

    # levelカラムを削除し、max_levelとmin_levelカラムを追加
    add_column :battles, :max_level, :string
    add_column :battles, :min_level, :string
    remove_column :battles, :level, :string

    # total_hpのnull制約を解除
    change_column_null :battles, :total_hp, true
  end
end
