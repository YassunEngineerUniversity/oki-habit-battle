require 'rails_helper'

RSpec.describe "Api::V1::Sessions", type: :request do
  let!(:user) { FactoryBot.create(:user) }
  let!(:invalid_email_user) { { email: "invalid_email", password: "password" } }
  let!(:invalid_password_user) { { email: user.email, password: "invalid_password" } }
  let(:json_response) { JSON.parse(response.body) }

  subject { post "/api/v1/login", params: target_user }

  shared_examples "Successful case" do | status, success_message |
    it "ログイン成功" do
      subject
      expect(user).to be_valid
      expect(response).to have_http_status(status)
      expect(json_response["message"]).to eq(success_message)
    end
  end

  shared_examples "Error case" do | status, error_message |
    it "ログイン失敗" do
      subject
      expect(response).to have_http_status(status)
      expect(json_response["errors"]).to eq(error_message)
    end
  end

  context "正常にログインできる場合" do
    let(:target_user) { { email: user.email, password: user.password } }
    include_examples "Successful case", :ok, "ログインに成功しました。"
  end

  context "無効なメールアドレスを使用した場合" do
    let(:target_user) { invalid_email_user }
    include_examples "Error case", :unauthorized, "無効なメールアドレスかパスワードです。"
  end

  context "無効なパスワードを使用した場合" do
    let(:target_user) { invalid_password_user }
    include_examples "Error case", :unauthorized, "無効なメールアドレスかパスワードです。"
  end

  context "パスワードが6桁以下の場合" do
    let(:target_user) { { email: user.email, password: "fadfad" } }
    include_examples "Error case", :unauthorized, "無効なメールアドレスかパスワードです。"
  end
end
