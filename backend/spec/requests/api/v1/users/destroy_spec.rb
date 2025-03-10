require 'rails_helper'

RSpec.describe "users_controller destroy", type: :request do
  let!(:user) { FactoryBot.create(:user) }
  let(:json_response) { JSON.parse(response.body) }

  subject { delete "/api/v1/me" }

  shared_examples "Successful case" do | status, message |
    it "ユーザが退会に成功" do
      subject
      user.reload
      expect(response).to have_http_status(status)
      expect(user.deleted_at).not_to eq(nil)
      expect(json_response["message"]).to eq(message)
    end
  end

  shared_examples "Error case" do | status, error_message |
    it "ユーザが退会に失敗" do
      subject
      expect(response).to have_http_status(status)
      expect(json_response["errors"]).to eq(error_message)
    end
  end

  context "セッションで認証されている場合" do
    before do
      post "/api/v1/login", params: { email: user.email, password: user.password }
    end

    context "正常なログインユーザが存在する場合" do
      include_examples "Successful case", :ok, "退会が完了しました。"
    end
  end

  context "セッションで認証されていない場合" do
    include_examples "Error case", :unauthorized, "認証されていないアクセスです。"
  end
end