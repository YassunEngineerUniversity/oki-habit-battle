require 'rails_helper'

RSpec.describe "battles_favorites_controller destroy", type: :request do
  let!(:host_user) { FactoryBot.create(:user, :with_battles)}
  let!(:other_user) { FactoryBot.create(:user, :with_battles)}
  let(:favorite_battle) { FactoryBot.create(:battle_favorite, user: host_user, battle: other_user.battles.first)}
  let(:json_response) { JSON.parse(response.body) }

  subject { delete "/api/v1/battles/#{target_battle_id}/favorites", as: :json }

  shared_examples "Successful case" do | status, success_message |
    it "バトルのお気に入り解除に成功" do
      FactoryBot.create(:battle_favorite, user: host_user, battle_id: target_battle_id)
      subject
      expect(response).to have_http_status(status)
      expect(json_response["message"]).to eq(success_message)

      # DBにレコードが削除されているか確認
      battle_favorites = BattleFavorite.find_by(battle_id: target_battle_id, user_id: host_user.id)
      expect(battle_favorites).to be_nil
    end
  end

  shared_examples "Error case" do | status, error_message |
    it "バトルのお気に入り解除に失敗" do
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
    context "正常にお気に入り解除できる場合" do
      let(:target_battle_id) { other_user.battles.first.id }
      include_examples "Successful case", :ok, "お気に入りを解除しました"
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

    context "自分のバトルをお気に入りしようとした場合" do
      let(:target_battle_id) { host_user.battles.sample.id }
      include_examples "Error case", :not_found, "バトルが見つかりません"
    end

    context "すでにお気に入り解除済みバトルにお気に入り解除しようとした場合" do
      let(:target_battle_id) { other_user.battles.first.id }
      before do
        favorite_battle.destroy
      end
      include_examples "Error case", :not_found, "お気に入り登録が見つかりません"
    end
  end

  context "セッションで認証されていない場合" do
    let(:target_battle_id) { other_user.battles.first.id }
    include_examples "Error case", :unauthorized, "認証されていないアクセスです。"
  end
end