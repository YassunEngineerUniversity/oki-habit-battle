require 'rails_helper'

RSpec.describe "battles_controller show", type: :request do
  let!(:host_user) { FactoryBot.create(:user, :with_battles)}
  let!(:other_user) { FactoryBot.create(:user, :with_battles)}
  let(:json_response) { JSON.parse(response.body) }

  subject { get "/api/v1/battles/#{target_battle_id}", as: :json }

  shared_examples "Successful case" do | status |
    it "バトル詳細が取得できる" do
      subject
      battle = Battle.find_by(id: target_battle_id)
      if battle
        expect(response).to have_http_status(status)
        expect(json_response["id"]).to eq(battle.id)
        expect(json_response["title"]).to eq(battle.title)
        expect(json_response["detail"]).to eq(battle.detail)
        expect(json_response["apply_start_date"]).to eq(battle.apply_start_date.strftime("%Y-%m-%dT%H:%M:%S.%L%:z"))
        expect(json_response["apply_end_date"]).to eq(battle.apply_end_date.strftime("%Y-%m-%dT%H:%M:%S.%L%:z"))
        expect(json_response["battle_start_date"]).to eq(battle.battle_start_date.strftime("%Y-%m-%dT%H:%M:%S.%L%:z"))
        expect(json_response["battle_end_date"]).to eq(battle.battle_end_date.strftime("%Y-%m-%dT%H:%M:%S.%L%:z"))
        expect(json_response["reword"]).to eq(battle.reword)
        expect(json_response["level"]).to eq(battle.level)
        expect(json_response["achievement_rate"]).to eq(battle.achievement_rate)
        expect(json_response["total_hp"]).to eq(battle.total_hp)
        expect(json_response["host_user_id"]).to eq(battle.host_user_id)

        json_response["participants"].each_with_index do |participant, index|
          expect(participant["user_id"]).to eq(battle.participants[index].id)
          expect(participant["name"]).to eq(battle.participants[index].name)
        end
        
        json_response["categories"].each_with_index do |category, index|
          expect(category["name"]).to eq(battle.categories[index].name)
        end
      end
    end
  end

  shared_examples "Error case" do | status, error_message |
    it "ユーザが取得できない" do
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
    context "正常にバトル詳細が取得できる場合" do
      let(:target_battle_id) { Battle.all.sample.id }
      include_examples "Successful case", :ok
    end

    context "自分がホストの場合" do
      let(:target_battle_id) { host_user.battles.sample.id }
      include_examples "Successful case", :ok
    end

    context "自分がホストではない場合" do
      let(:target_battle_id) { other_user.battles.sample.id }
      include_examples "Successful case", :ok
    end

    # # 異常系
    context "存在しないバトルIDを指定した場合" do
      let(:target_battle_id) { 9999 }
      include_examples "Error case", :not_found, "バトルが見つかりません"
    end

    context "バトルIDに文字列を指定した場合" do
      let(:target_battle_id) { "invalid" }
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