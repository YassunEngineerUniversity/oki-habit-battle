require 'rails_helper'

RSpec.describe "battles_progress_controller create", type: :request do
  let!(:host_user) { FactoryBot.create(:user, :with_battles) }
  let!(:host_user_battle) { 
    host_user.battles.first.battle_history.update(status: "active")
    host_user.battles.first
  }
  let!(:other_user) { FactoryBot.create(:user, :with_battles) }
  let!(:other_user_battle) {
    other_user.battles.first.battle_history.update(status: "active")
    other_user.battles.first
  }
  let(:json_response) { JSON.parse(response.body) }

  subject { post "/api/v1/battle-progress", params: target_battle, as: :json }

  shared_examples "Successful case" do | status, success_message |
    it "バトルの進捗作成に成功" do
      subject

      stamp = FactoryBot.create(:stamp, user: host_user)

      expect(response).to have_http_status(status)
      expect(response.content_type).to start_with('application/json')
      expect(json_response["message"]).to eq(success_message)

      # DBにレコードが追加されているか確認
      battle_progress = host_user.battle_progresses.where(["battle_id = ? and progress_date = ?", target_battle[:battle_id], Time.zone.today]).first
      expect(battle_progress).to be_present

      # スタンプが生成されているか確認
     
    end
  end

  shared_examples "Error case" do | status, error_message |
    it "バトルの進捗作成に失敗" do
      subject
      expect(response).to have_http_status(status)
      expect(json_response["errors"]).to eq(error_message)
    end
  end

  context "セッションで認証されている場合" do
    before do
      post "/api/v1/login", params: { email: host_user.email, password: host_user.password }
    end

    # 正常系
    context "正常にバトル進捗が作成できる場合" do
      let(:target_battle) { { battle_id: host_user_battle.id } }
      include_examples "Successful case", :ok, "バトルの進捗が作成されました"
    end

    # context "自分がhost_userでないバトルの進捗を作成しようとした場合" do
    #   let(:target_battle) { { battle_id: other_user_battle.id } }
    #   include_examples "Successful case", :ok, "バトルの進捗が作成されました"
    # end

    # # 異常系
    # context "存在しないbattle_idの場合" do
    #   let(:target_battle) { { battle_id: 9999 } }
    #   include_examples "Error case", :not_found, "バトルが見つかりません"
    # end

    # context "battle_idが文字列の場合" do
    #   let(:target_battle) { { battle_id: "invalid" } }
    #   include_examples "Error case", :not_found, "バトルが見つかりません"
    # end

    # context "バトルがactiveでない場合" do
    #   let(:target_battle) { { battle_id: host_user_battle.id } }
    #   before do
    #     host_user_battle.battle_history.update(status: "completed")
    #   end
    #   include_examples "Error case", :not_found, "バトルが見つかりません"
    # end

    # context "一日に同じバトルに複数回進捗を登録しようとした場合" do
    #   let(:target_battle) { { battle_id: host_user_battle.id } }
    #   before do
    #     host_user.battle_progresses.create(battle: host_user_battle, progress_date: Time.zone.today)
    #   end
    #   include_examples "Error case", :unprocessable_entity, "バトル進捗の作成に失敗しました"
    # end
  end

  # context "セッションで認証されていない場合" do
  #   let(:target_battle) { { battle_id: host_user_battle.id } }
  #   include_examples "Error case", :unauthorized, "認証されていないアクセスです。"
  # end
end