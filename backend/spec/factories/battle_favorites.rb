# == Schema Information
#
# Table name: battle_favorites
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  battle_id  :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_battle_favorites_on_battle_id              (battle_id)
#  index_battle_favorites_on_user_id                (user_id)
#  index_battle_favorites_on_user_id_and_battle_id  (user_id,battle_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (battle_id => battles.id)
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :battle_favorite do
    user { nil }
    battle { nil }
  end
end
