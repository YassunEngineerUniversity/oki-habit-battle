require 'rails_helper'

RSpec.describe "Users_controller Me", type: :request do
  let!(:user) { FactoryBot.create(:user) }
  let!(:invaild_user_id) { 9999 }
  let(:json_response) { JSON.parse(response.body) }

  subject { get "/api/v1/me" }

  shared_examples "Successful case" do
    it "該当するユーザが取得できる" do
      subject
      expect(json_response["id"]).to eq(user.id)
      expect(json_response["name"]).to eq(user.name)
      expect(json_response["email"]).to eq(user.email)
      expect(json_response["image_url"]).to eq(user.image_url)
      expect(json_response["profile"]).to eq(user.profile)
      expect(json_response["reword_total"]).to eq(user.reword_total)
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
      post "/api/v1/login", params: { email: user.email, password: user.password }
    end

    context "正常に該当のユーザを返す" do
      include_examples "Successful case"
    end
  end

  context "セッションで認証されていない場合" do
    include_examples "Error case", :unauthorized, ["認証されていないアクセスです。"]
  end
end