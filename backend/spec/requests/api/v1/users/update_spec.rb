require 'rails_helper'

RSpec.describe "users_controller update", type: :request do
  let(:random_name_length) { rand(1..255) }
  let(:name_data) { Faker::Name.name[0, random_name_length] }
  let(:profile_data) { Faker::Lorem.sentence(word_count: 254) }

  let!(:user) { FactoryBot.create(:user) }
  let!(:png_image) { fixture_file_upload(Rails.root.join('spec/fixtures/files/test_image.png'), 'image/png') }
  let!(:jpg_image) { fixture_file_upload(Rails.root.join('spec/fixtures/files/test_image.jpg'), 'image/jpg') }
  let!(:webp_image) { fixture_file_upload(Rails.root.join('spec/fixtures/files/test_image.webp'), 'image/webp') }
  let(:json_response) { JSON.parse(response.body) }

  subject { put "/api/v1/me", params: target_user }

  shared_examples "Successful case" do | status, message |
    it "ユーザ情報の更新に成功" do
      subject
      user.reload
      expect(response).to have_http_status(status)
      expect(json_response["message"]).to eq(message)

      # DBのレコードが更新されているか確認
      if target_user.dig(:user, :name)
        expect(user.name).to eq(target_user[:name])
      end

      if target_user.dig(:user, :profile)
        expect(user.profile).to eq(target_user[:profile])
      end

      if target_user.dig(:user, :image)
        # ActiveStorage内で画像が存在するか
        expect(user.image.attached?).to eq(true)
      end
    end
  end

  shared_examples "Error case" do | status, error_message |
    it "ユーザ情報の更新に失敗" do
      subject
      expect(response).to have_http_status(status)
      expect(json_response["errors"]).to eq(error_message)

      if target_user.dig(:user, :image)
        expect(user.image.attached?).to eq(false)
      end
    end
  end

  context "セッションで認証されている場合" do
    before do
      post "/api/v1/login", params: { email: user.email, password: user.password }
    end

    # 正常系
    context "全て更新する場合" do
      let(:target_user) { { name: name_data, profile: profile_data, image: png_image } }
      include_examples "Successful case", :ok, "ユーザ情報を更新しました。"
    end

    context "名前のみ更新する場合" do
      let(:target_user) { { name: name_data } }
      include_examples "Successful case", :ok, "ユーザ情報を更新しました。"
    end

    context "プロフィールのみ更新する場合" do
      let(:target_user) { { profile: profile_data } }
      include_examples "Successful case", :ok, "ユーザ情報を更新しました。"
    end

    context "PNGの画像のみ更新する場合" do
      let(:target_user) { { image: png_image } }
      include_examples "Successful case", :ok, "ユーザ情報を更新しました。"
    end

    context "JPGの画像のみ更新する場合" do
      let(:target_user) { { image: jpg_image } }
      include_examples "Successful case", :ok, "ユーザ情報を更新しました。"
    end

    context "WEBPの画像のみ更新する場合" do
      let(:target_user) { { image: webp_image } }
      include_examples "Successful case", :ok, "ユーザ情報を更新しました。"
    end

    # 異常系
    context "名前が空の場合" do
      let(:target_user) { { name: "" } }
      include_examples "Error case", :bad_request, ["Name can't be blank", "Name is too short (minimum is 1 character)"]
    end

    context "名前が255字以上の場合" do
      let(:target_user) { { name: Faker::Lorem.characters(number: 256) } }
      include_examples "Error case", :bad_request, ["Name is too long (maximum is 255 characters)"]
    end

    context "不正な画像形式の場合" do
      let(:target_user) { { image: fixture_file_upload(Rails.root.join('spec/fixtures/files/test_image.txt'), 'text/plain') } }
      include_examples "Error case", :bad_request, [ "Image is not one of JPEG, PNG, or WEBP" ]
    end

    context "不正な画像サイズの場合" do
      let(:target_user) { { image: fixture_file_upload(Rails.root.join('spec/fixtures/files/2mb.jpg'), 'image/jpg') } }
      include_examples "Error case", :bad_request, [ "Image upload a file that is 1MB or less" ]
    end
  end

  context "セッションで認証されていない場合" do
    let(:target_user) { { name: name_data, profile: profile_data } }
    include_examples "Error case", :unauthorized, "認証されていないアクセスです。"
  end
end