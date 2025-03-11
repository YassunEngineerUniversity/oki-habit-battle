require 'rails_helper'

RSpec.describe "battles_controller index", type: :request do
  let!(:user) { FactoryBot.create(:user) }
  let!(:host_user) { FactoryBot.create(:user, :with_battles) }
  let(:json_response) { JSON.parse(response.body) }

  subject { get "/api/v1/battles" }

  shared_examples "Successful case" do | status |
    it "バトル一覧が取得できる" do
      subject
    end
  end

  shared_examples "Error case" do | status, error_message |
    it "ユーザが取得できない" do
      subject
      expect(response).to have_http_status(status)
      expect(json_response["errors"]).to eq(error_message)
    end
  end

  context "セッションで認証されている場合" do
    before do
      post "/api/v1/login", params: { email: host_user.email, password: host_user.password }
    end

    context "正常にバトル一覧が取得できる場合" do
      include_examples "Successful case"
    end
  end

  context "セッションで認証されていない場合" do
    include_examples "Error case", :unauthorized, "認証されていないアクセスです。"
  end
end