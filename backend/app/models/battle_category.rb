# == Schema Information
#
# Table name: battle_categories
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  battle_id   :bigint           not null
#  category_id :bigint           not null
#
# Indexes
#
#  index_battle_categories_on_battle_id    (battle_id)
#  index_battle_categories_on_category_id  (category_id)
#
# Foreign Keys
#
#  fk_rails_...  (battle_id => battles.id)
#  fk_rails_...  (category_id => categories.id)
#
class BattleCategory < ApplicationRecord
  belongs_to :battle
  belongs_to :category
end
