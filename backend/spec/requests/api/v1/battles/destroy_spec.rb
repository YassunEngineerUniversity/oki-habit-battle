require 'rails_helper'

RSpec.describe "battles_controller destroy", type: :request do
  let!(:host_user) { FactoryBot.create(:user, :with_battles)}
  let!(:other_user) { FactoryBot.create(:user, :with_battles)}
  let(:json_response) { JSON.parse(response.body) }

  subject { delete "/api/v1/battles/#{target_battle_id}", as: :json }

  shared_examples "Successful case" do | status, success_message |
    it "バトルが削除される" do
      subject
      expect(response).to have_http_status(status)
      expect(json_response["message"]).to eq(success_message)
      
      # DBからレコードが削除されているか確認
      expect(Battle.find_by(id: target_battle_id)).to be_nil
    end
  end

  shared_examples "Error case" do | status, error_message |
    it "バトルが削除されない" do
      battle_count = Battle.count
      subject
      expect(response).to have_http_status(status)
      expect(json_response["errors"]).to eq(error_message)

      # DBからレコードが削除されていないか確認
      expect(Battle.count).to eq(battle_count)
    end
  end

  context "セッションで認証されている場合" do
    before do
      post "/api/v1/login", params: { email: host_user.email, password: host_user.password }
    end

    # 正常系
    context "正常にバトルが削除される場合" do
      let(:target_battle_id) { host_user.battles.sample.id }
      include_examples "Successful case", :ok, "バトルが削除されました"
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

    context "他のユーザのバトルを削除しようとした場合" do
      let(:target_battle_id) { other_user.battles.sample.id }
      include_examples "Error case", :not_found, "バトルが見つかりません"
    end
  end

  context "セッションで認証されていない場合" do
    context "ホストのバトル場合" do
      let(:target_battle_id) { host_user.battles.sample.id }
      include_examples "Error case", :unauthorized, "認証されていないアクセスです。"
    end
    context "ホスト以外の場合" do
      let(:target_battle_id) { other_user.battles.sample.id }
      include_examples "Error case", :unauthorized, "認証されていないアクセスです。"
    end
  end
end