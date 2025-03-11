require 'rails_helper'

RSpec.describe "sessions_controller destroy", type: :request do
  let!(:user) { FactoryBot.create(:user) }
  let(:json_response) { JSON.parse(response.body) }

  subject { delete "/api/v1/logout" }

  shared_examples "Successful case" do | status, success_message |
    it "ログアウト成功" do
      subject
      expect(response).to have_http_status(status)
      expect(json_response["message"]).to eq(success_message)
    end
  end

  shared_examples "Error case" do | status, error_message |
    it "ログアウト失敗" do
      subject
      expect(response).to have_http_status(status)
      expect(json_response["errors"]).to eq(error_message)
    end
  end

  context "セッションで認証されている場合" do
    before do
      post "/api/v1/login", params: { email: user.email, password: user.password }
    end

    context "正常にログアウトできる場合" do
      include_examples "Successful case", :ok, "ログアウトに成功しました。"
    end
  end

  context "セッションで認証されていない場合" do
    context "ログインしていない状態でログアウトした場合" do
      include_examples "Error case", :unauthorized, "ログインしていません。"
    end
  end
end
