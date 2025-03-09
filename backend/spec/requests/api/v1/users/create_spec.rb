require 'rails_helper'

RSpec.describe "Users_controller Create", type: :request do
  let(:random_name_length)   { rand(1..255) }
  let(:random_password_length) { rand(6..70) }
  let(:name_data)            { Faker::Name.name[0, random_name_length] }
  let(:email_data)           { Faker::Internet.unique.email }
  let(:password_data)        { Faker::Lorem.characters(number: random_password_length, min_alpha: 4) }
  let!(:user) { FactoryBot.create(:user) }
  let!(:valid_user) { { user: { name: name_data, email: email_data, password: password_data } }}
  let(:json_response) { JSON.parse(response.body) }

  subject { post "/api/v1/users", params: target_user }

  shared_examples "Successful case" do | status, success_message |
    it "新規ユーザ登録に成功" do
      subject
      expect(response).to have_http_status(status)
      expect(json_response["message"]).to eq(success_message)

      # DBにレコードが追加されているか確認
      expect(User.find_by(email: target_user[:user][:email])).to be_present
    end
  end

  shared_examples "Error case" do | status, error_message |
    it "新規ユーザ登録に失敗" do
      expect {
        subject
        expect(response).to have_http_status(status)
        expect(json_response["errors"]).to eq(error_message)
      }.not_to change(User, :count)
    end
  end

  context "正常にユーザー登録できる場合" do
    let(:target_user) { valid_user }
    include_examples "Successful case", :ok, "新規ユーザを作成しました。"
  end

  context "メールアドレスが重複している場合" do
    let(:target_user) { { user: { name: name_data, email: user.email, password: password_data } } }
    include_examples "Error case", :bad_request, [ "Email has already been taken" ]
  end

  context "名前が空の場合" do
    let(:target_user) { { user: { name: "", email: email_data, password: password_data } } }
    include_examples "Error case", :bad_request, ["Name can't be blank", "Name is too short (minimum is 1 character)"]
  end

  context "メールアドレスが空の場合" do
    let(:target_user) { { user: { name: name_data, email: "", password: password_data } } }
    include_examples "Error case", :bad_request, ["Email can't be blank"]
  end

  context "パスワードが空の場合" do 
    let(:target_user) { { user: { name: name_data, email: email_data, password: "" } } }
    include_examples "Error case", :bad_request, ["Password can't be blank", "Password is too short (minimum is 6 characters)"]
  end

  context "名前が255字以上の場合" do 
    let(:target_user) { { user: { name: Faker::Lorem.characters(number: 256), email: email_data, password: password_data } } }
    include_examples "Error case", :bad_request, ["Name is too long (maximum is 255 characters)"]
  end

  context "パスワードが72字以上の場合" do 
    let(:target_user) { { user: { name: name_data, email: email_data, password: Faker::Lorem.characters(number: 73, min_alpha: 4) } } }
    include_examples "Error case", :bad_request, ["Password is too long"]
  end
end
