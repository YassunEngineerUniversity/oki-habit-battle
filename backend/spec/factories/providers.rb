# == Schema Information
#
# Table name: providers
#
#  id                  :bigint           not null, primary key
#  access_token        :string(255)
#  auth_protocol       :string(255)      default("oauth2")
#  expires_at          :datetime
#  provider            :string(255)
#  refresh_token       :string(255)
#  scope               :string(255)
#  token_type          :string(255)      default("Bearer")
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  provider_account_id :string(255)
#  user_id             :bigint           not null
#
# Indexes
#
#  index_providers_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :provider do
    
  end
end
