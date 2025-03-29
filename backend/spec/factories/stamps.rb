# == Schema Information
#
# Table name: stamps
#
#  id             :bigint           not null, primary key
#  generated_date :date
#  obtained       :boolean          default(FALSE), not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  user_id        :bigint           not null
#
# Indexes
#
#  index_stamps_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :stamp do
    obtained { false }
    association :user
  end
end
