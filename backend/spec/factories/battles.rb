# == Schema Information
#
# Table name: battles
#
#  id                :bigint           not null, primary key
#  achievement_rate  :integer          not null
#  apply_end_date    :datetime         not null
#  apply_start_date  :datetime         not null
#  battle_end_date   :datetime         not null
#  battle_start_date :datetime         not null
#  detail            :text(65535)      not null
#  level             :string(255)
#  participant_limit :integer          default(1), not null
#  per_bonus         :integer
#  per_reword        :integer          not null
#  title             :string(255)      not null
#  total_hp          :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  host_user_id      :bigint           not null
#
# Indexes
#
#  index_battles_on_host_user_id  (host_user_id)
#
# Foreign Keys
#
#  fk_rails_...  (host_user_id => users.id)
#

FactoryBot.define do
  factory :battle do
    title { Faker::Lorem.word }
    apply_start_date { Faker::Time.between(from: DateTime.now - 1, to: DateTime.now).iso8601 }
    apply_end_date   { Faker::Time.between(from: DateTime.now, to: DateTime.now + 1).iso8601 }
    battle_start_date { Faker::Time.between(from: DateTime.now + 1, to: DateTime.now + 2).iso8601 }
    battle_end_date   { Faker::Time.between(from: DateTime.now + 2, to: DateTime.now + 3).iso8601 }
    level { ["E", "D", "C", "B", "A", "AA", "AAA", "S", "SS", "SSS"].sample }
    per_bonus { Faker::Number.between(from: 100, to: 1000) }
    participant_limit { Faker::Number.between(from: 1, to: 5) }
    detail { Faker::Lorem.sentence }
    per_reword { Faker::Number.between(from: 100, to: 1000) }
    achievement_rate { Faker::Number.between(from: 1, to: 100) }
    total_hp { Faker::Number.between(from: 500, to: 1000) }
    association :host_user, factory: :user

    after(:create) do |battle|
      create(:battle_participant, battle: battle, user:battle.host_user)
      create(:battle_history, battle: battle)
      create(:battle_category, battle: battle)
    end
  end
end
