require 'rails_helper'

RSpec.describe "battles_controller create", type: :request do
  include BattleHelpers

  let!(:host_user) { FactoryBot.create(:user)}
  let(:categories) { FactoryBot.create_list(:category, 10) }
  let(:json_response) { JSON.parse(response.body) }

  let!(:png_image) { fixture_file_upload(Rails.root.join('spec/fixtures/files/test_image.png'), 'image/png') }
  let!(:jpg_image) { fixture_file_upload(Rails.root.join('spec/fixtures/files/test_image.jpg'), 'image/jpg') }
  let!(:webp_image) { fixture_file_upload(Rails.root.join('spec/fixtures/files/test_image.webp'), 'image/webp') }

  subject { post "/api/v1/battles", params: target_battle, as: :multipart }

  shared_examples "Successful case" do | status, success_message |
    it "新規バトル作成に成功" do
      subject
      expect(response).to have_http_status(status)
      expect(json_response["message"]).to eq(success_message)

      # DBにレコードが追加されているか確認
      battle = Battle.find_by(detail: target_battle[:detail])
      expect(battle).to be_present
      expect(BattleParticipant.find_by(battle_id: battle.id, user_id: host_user.id)).to be_present
      expect(BattleHistory.find_by(battle_id: battle.id)).to be_present
      battle.categories.each do |category|
        expect(BattleCategory.find_by(battle_id: battle.id, category_id: category.id)).to be_present
      end
    end
  end

  shared_examples "Error case" do | status |
    it "新規バトル作成に失敗" do
      expect {
        subject
        expect(response).to have_http_status(status)
      }.not_to change {[Battle.count, BattleHistory.count, BattleParticipant.count, BattleCategory.count] }
    end
  end

  shared_examples "Error case without session" do | status, error_message |
    it "新規バトル作成に失敗" do
      expect {
        subject
        expect(response).to have_http_status(status)
        expect(json_response["errors"]).to eq(error_message)
      }.not_to change {[Battle.count, BattleHistory.count, BattleParticipant.count, BattleCategory.count] }
    end
  end


  context "セッションで認証されている場合" do
    before do
      post "/api/v1/login", params: { email: host_user.email, password: host_user.password }

      # OpenaiServiceのモックを作成
      openai_client_mock = double("OpenaiService")
      allow(openai_client_mock).to receive(:chat)

      allow(Battles::OpenaiService).to receive(:new).and_return(openai_client_mock)
      allow(openai_client_mock).to receive(:create_five_rate).and_return("3")
    end

    # 正常系
    context "正常にバトル作成できる場合" do
      let(:target_battle) { valid_battle_attributes }
      include_examples "Successful case", :ok, "バトルが作成されました"
    end

    context "JPGの画像の場合" do
      let(:target_battle) { valid_battle_attributes({background_image: jpg_image }) }
      include_examples "Successful case", :ok, "バトルが作成されました"
    end

    context "WEBPの画像の場合" do
      let(:target_battle) { valid_battle_attributes({background_image: webp_image }) }
      include_examples "Successful case", :ok, "バトルが作成されました"
    end

    # 異常系
    context "タイトルが空の場合" do
      let(:target_battle) { valid_battle_attributes({title: ""}) }
      include_examples "Error case", :unprocessable_entity
    end

    context "募集開始日が空の場合" do
      let(:target_battle) { valid_battle_attributes({apply_start_date: ""}) }
      include_examples "Error case", :unprocessable_entity
    end

    context "募集終了日が空の場合" do
      let(:target_battle) { valid_battle_attributes({apply_end_date: ""}) }
      include_examples "Error case", :unprocessable_entity
    end

    context "バトル開始日が空の場合" do
      let(:target_battle) { valid_battle_attributes({battle_start_date: ""}) }
      include_examples "Error case", :unprocessable_entity
    end

    context "バトル終了日が空の場合" do
      let(:target_battle) { valid_battle_attributes({battle_end_date: ""}) }
      include_examples "Error case", :unprocessable_entity
    end
    
    context "詳細が空の場合" do
      let(:target_battle) { valid_battle_attributes({detail: ""}) }
      include_examples "Error case", :unprocessable_entity
    end

    context "達成率が空の場合" do
      let(:target_battle) { valid_battle_attributes({achievement_rate: ""}) }
      include_examples "Error case", :unprocessable_entity
    end

    context "募集開始日がパースできない文字列の場合" do
      let(:target_battle) { valid_battle_attributes({apply_start_date: "Invaid"}) }
      include_examples "Error case", :unprocessable_entity
    end

    context "募集終了日がパースできない文字列の場合" do
      let(:target_battle) { valid_battle_attributes({apply_end_date: "Invalid"}) }
      include_examples "Error case", :unprocessable_entity
    end

    context "バトル開始日がパースできない文字列の場合" do
      let(:target_battle) { valid_battle_attributes({battle_start_date: "Invalid"}) }
      include_examples "Error case", :unprocessable_entity
    end

    context "バトル終了日がパースできない文字列の場合" do
      let(:target_battle) { valid_battle_attributes({battle_end_date: "Invalid"}) }
      include_examples "Error case", :unprocessable_entity
    end

    context "達成率が文字列の場合" do
      let(:target_battle) { valid_battle_attributes({achievement_rate: "Invalid"}) }
      include_examples "Error case", :unprocessable_entity
    end

    context "参加人数が文字列の場合" do
      let(:target_battle) { valid_battle_attributes({participant_limit: "Invalid"}) }
      include_examples "Error case", :unprocessable_entity
    end

    context "参加人数が0の場合" do
      let(:target_battle) { valid_battle_attributes({participant_limit: 0}) }
      include_examples "Error case", :unprocessable_entity
    end

    context "参加人数が5人以上の場合" do
      let(:target_battle) { valid_battle_attributes({participant_limit: 6}) }
      include_examples "Error case", :unprocessable_entity
    end

    context "タイトルが256文字以上の場合" do
      let(:target_battle) { valid_battle_attributes({title: Faker::Lorem.characters(number: 256)}) }
      include_examples "Error case", :unprocessable_entity
    end
  end

  context "セッションで認証されていない場合" do
    let(:target_battle) { valid_battle_attributes }
    include_examples "Error case without session", :unauthorized, "認証されていないアクセスです。"
  end
end