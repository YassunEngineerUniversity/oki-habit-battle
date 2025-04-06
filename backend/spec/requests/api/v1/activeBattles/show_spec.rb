require 'rails_helper'

RSpec.describe "active_battles_controller show", type: :request do
  let!(:host_user) { FactoryBot.create(:user, :with_battles) }
  let!(:other_user) { FactoryBot.create(:user, :with_battles) }
  let!(:active_battle) { FactoryBot.create(:battle, host_user: host_user) }
  let(:json_response) { JSON.parse(response.body) }

  subject { get "/api/v1/active-battles/#{target_battle_id}", as: :json }

  shared_examples "Successful case" do |status|
    it "対戦中のバトルの詳細が取得できる" do
      subject
      expect(response).to have_http_status(status)
      expect(response.content_type).to start_with('application/json')

      acitve_battle = Battle.find_by(id: target_battle_id)
      battle_period = (acitve_battle.battle_end_date.to_date - acitve_battle.battle_start_date.to_date).to_i
      per_total_hp = acitve_battle.total_hp / acitve_battle.participants.count
      active_battle_participants =  acitve_battle.battle_participants.map do |participant|
        user = User.find_by(id: participant.user_id)
        participant_progresses = user.battle_progresses.where(battle_id: acitve_battle.id)
        per_current_hp = participant_progresses.count == 0 ? per_total_hp : per_total_hp * (participant_progresses.count / battle_period)
        per_current_hp = 0 if per_current_hp < 0
        {
          user_id: participant.user_id,
          name: participant.user.name,
          current_hp: per_current_hp,
          total_hp: per_total_hp
        }
      end

      if active_battle
        expect(json_response["id"]).to eq(active_battle.id)
        expect(json_response["title"]).to eq(active_battle.title)
        expect(json_response["detail"]).to eq(active_battle.detail)
        expect(json_response["apply_start_date"]).to eq(active_battle.apply_start_date.strftime("%Y-%m-%dT%H:%M:%S.%L%:z"))
        expect(json_response["apply_end_date"]).to eq(active_battle.apply_end_date.strftime("%Y-%m-%dT%H:%M:%S.%L%:z"))
        expect(json_response["battle_start_date"]).to eq(active_battle.battle_start_date.strftime("%Y-%m-%dT%H:%M:%S.%L%:z"))
        expect(json_response["battle_end_date"]).to eq(active_battle.battle_end_date.strftime("%Y-%m-%dT%H:%M:%S.%L%:z"))
        expect(json_response["per_reword"]).to eq(active_battle.per_reword)
        expect(json_response["per_bonus"]).to eq(active_battle.per_bonus)
        expect(json_response["level"]).to eq(active_battle.level)
        expect(json_response["achievement_rate"]).to eq(active_battle.achievement_rate)
        expect(json_response["total_hp"]).to eq(active_battle.total_hp)
        expect(json_response["host_user_id"]).to eq(active_battle.host_user_id)

        if json_response["participants"].count > 0
          json_response["participants"].each_with_index do |participant, index|
            expect(participant["user_id"]).to eq(active_battle_participants[index][:user_id])
            expect(participant["name"]).to eq(active_battle_participants[index][:name])
            expect(participant["current_hp"]).to eq(active_battle_participants[index][:current_hp])
            expect(participant["total_hp"]).to eq(active_battle_participants[index][:total_hp])
          end
        end

        if json_response["categories"].count > 0
          json_response["categories"].each_with_index do |category, index|
            expect(category["id"]).to eq(active_battle.categories[index].id)
            expect(category["name"]).to eq(active_battle.categories[index].name)
          end
        end
      end
    end
  end

  shared_examples "Error case" do |status, error_message|
    it "バトル一覧が取得できない" do
      subject
      expect(response).to have_http_status(status)
      expect(json_response["errors"]).to eq(error_message)
    end
  end

  context "セッションで認証されている場合" do
    before do
      post "/api/v1/login", params: { email: host_user.email, password: host_user.password }
      active_battle.battle_history.update(status: Status::ACTIVE)
    end

    # 正常系
    context "正常に対戦中のバトルの詳細が取得できる場合" do
      let(:target_battle_id) { active_battle.id }
      include_examples "Successful case", :ok
    end

    # 異常系
    context "バトルが存在しない場合" do
      let(:target_battle_id) { 999 }
      include_examples "Error case", :not_found, "バトルが見つかりません"
    end

    context "バトルが対戦中でない場合" do
      let(:target_battle_id) { active_battle.id }
      before do
        active_battle.battle_history.update(status: Status::WAITING)
      end
      include_examples "Error case", :unprocessable_entity, "バトルが対戦中ではありません"
    end

    context "バトルIDに文字列を指定した場合" do
      let(:target_battle_id) { "invalid" }
      include_examples "Error case", :not_found, "バトルが見つかりません"
    end

    context "バトルに参加していない場合" do
      let(:target_battle_id) { other_user.battles.first.id }
      before do
        other_user.battles.first.battle_history.update(status: Status::ACTIVE)
      end
      include_examples "Error case", :unprocessable_entity, "バトルに参加していません"
    end
  end

  context "セッションで認証されていない場合" do
    let(:target_battle_id) { active_battle.id }
    include_examples "Error case", :unauthorized, "認証されていないアクセスです。"
  end
end