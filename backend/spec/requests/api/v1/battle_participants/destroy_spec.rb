require 'rails_helper'

RSpec.describe "battles_participants_controller create", type: :request do
  let!(:host_user) { FactoryBot.create(:user, :with_battles)}
  let!(:other_user) { FactoryBot.create(:user, :with_battles)}
  let!(:battle_participant) { FactoryBot.create(:battle_participant, user: host_user, battle: other_user.battles.sample)}
  let(:json_response) { JSON.parse(response.body) }

  subject { delete "/api/v1/battles/#{target_battle_id}/participants", as: :json }

  shared_examples "Successful case" do | status, success_message |
    it "バトル退出に成功" do
      subject
      expect(response).to have_http_status(status)
      expect(json_response["message"]).to eq(success_message)

      # DBにレコードが削除されているか確認
      battle_participants = BattleParticipant.find_by(battle_id: target_battle_id, user_id: host_user.id)
      expect(battle_participants).to be_nil
    end
  end

  shared_examples "Error case" do | status, error_message |
    it "バトル退出に失敗" do
      expect {
        subject
        expect(response).to have_http_status(status)
        expect(json_response["errors"]).to eq(error_message)
      }.not_to change { BattleParticipant.count}
    end
  end

  context "セッションで認証されている場合" do
    before do
      post "/api/v1/login", params: { email: host_user.email, password: host_user.password }

    end

    # 正常系
    context "正常にバトル退出できる場合" do
      let(:target_battle_id) { battle_participant.battle_id }
      include_examples "Successful case", :ok, "バトルを退出しました"
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

    context "自分のバトルを退出しようとする場合" do
      let(:target_battle_id) { host_user.battles.sample.id }
      include_examples "Error case", :bad_request, "自分のバトルは退出できません"
    end

    context "すでに退出済みのバトルを退出しようとした場合" do
      let(:target_battle_id) { battle_participant.battle_id }
      before do
        battle_participant.destroy
      end
      include_examples "Error case", :bad_request, "すでに退出済みです"
    end
  end

  context "セッションで認証されていない場合" do
    let(:target_battle_id) { battle_participant.battle_id }
    include_examples "Error case", :unauthorized, "認証されていないアクセスです。"
  end

end
