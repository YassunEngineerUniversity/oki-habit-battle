require 'rails_helper'

RSpec.describe "battles_participants_controller create", type: :request do
  let!(:host_user) { FactoryBot.create(:user, :with_battles)}
  let!(:other_user) { FactoryBot.create(:user, :with_battles)}
  let(:json_response) { JSON.parse(response.body) }
end