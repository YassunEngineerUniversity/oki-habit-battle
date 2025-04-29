# == Schema Information
#
# Table name: battle_histories
#
#  id                 :bigint           not null, primary key
#  achievement_status :string(255)
#  status             :string(255)      default("waiting"), not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  battle_id          :bigint           not null
#
# Indexes
#
#  index_battle_histories_on_battle_id  (battle_id)
#
# Foreign Keys
#
#  fk_rails_...  (battle_id => battles.id)
#
FactoryBot.define do
  factory :battle_history do
    status { "waiting" }
  end
end
