# == Schema Information
#
# Table name: battle_progresses
#
#  id            :bigint           not null, primary key
#  progress_date :date             not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  battle_id     :bigint           not null
#  user_id       :bigint           not null
#
# Indexes
#
#  index_battle_progresses_on_battle_id  (battle_id)
#  index_battle_progresses_on_user_id    (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (battle_id => battles.id)
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :battle_progress do
    
  end
end
