require 'rails_helper'

RSpec.describe "battles_favorites_controller create", type: :request do
  let!(:host_user) { FactoryBot.create(:user, :with_battles)}
  let!(:other_user) { FactoryBot.create(:user, :with_battles)}
  let(:json_response) { JSON.parse(response.body) }

  subject { post "/api/v1/battles/#{target_battle_id}/favorites", as: :json }

  shared_examples "Successful case" do | status, success_message |
    it "バトルのお気に入り追加に成功" do
      subject
      expect(response).to have_http_status(status)
      expect(json_response["message"]).to eq(success_message)

      # DBにレコードが追加されているか確認
      battle_favorites = BattleFavorite.find_by(battle_id: target_battle_id, user_id: host_user.id)
      expect(battle_favorites).to be_present
    end
  end

  shared_examples "Error case" do | status, error_message |
    it "バトルのお気に入り追加に失敗" do
      expect {
        subject
        expect(response).to have_http_status(status)
        expect(json_response["errors"]).to eq(error_message)
      }.not_to change { BattleFavorite.count }
    end
  end

  context "セッションで認証されている場合" do
    before do
      post "/api/v1/login", params: { email: host_user.email, password: host_user.password }
    end

    # 正常系
    context "正常にお気に入り登録できる場合" do
      let(:target_battle_id) { other_user.battles.sample.id }
      include_examples "Successful case", :ok, "お気に入りに追加しました"
    end

    context "一度お気に入りを解除して、再度お気に入り登録する" do
      let(:target_battle_id) { other_user.battles.sample.id }
      before do
        BattleFavorite.create(battle_id: target_battle_id, user_id: host_user.id)
        BattleFavorite.find_by(battle_id: target_battle_id, user_id: host_user.id).destroy
      end
      include_examples "Successful case", :ok, "お気に入りに追加しました"
    end

    # 異常系
    context "バトルが見つからない場合" do
      let(:target_battle_id) { 9999 }
      include_examples "Error case", :not_found, "バトルが見つかりません"
    end

    context "バトルIDに文字列を指定した場合" do
      let(:target_battle_id) { "invalid" }
      include_examples "Error case", :not_found, "バトルが見つかりません"
    end

    context "すでにお気に入りしているバトルにお気に入りしようとした場合" do
      let(:target_battle_id) { other_user.battles.first.id }
      before do
        BattleFavorite.create(battle_id: target_battle_id, user_id: host_user.id)
      end
      include_examples "Error case", :unprocessable_content, "お気に入り登録に失敗しました"
    end
  end

  context "セッションで認証されていない場合" do
    let(:target_battle_id) { other_user.battles.sample.id }
    include_examples "Error case", :unauthorized, "認証されていないアクセスです。"
  end
end