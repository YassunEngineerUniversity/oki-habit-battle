# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  deleted_at      :datetime
#  email           :string(255)      not null
#  name            :string(255)      not null
#  password_digest :string(255)      not null
#  profile         :text(65535)
#  reword_total    :integer          default(0), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.unique.email }
    password { "password" }
    profile { Faker::Lorem.sentence }
    deleted_at { nil }
    reword_total { 0 }

    trait :with_battles do
      
      after(:create) do |user|
        create_list(:battle, 3, host_user: user)
      end
    end
  end
end
