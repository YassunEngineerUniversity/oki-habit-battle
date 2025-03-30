require 'rails_helper'

RSpec.describe "homes_controller index", type: :request do
  
  let!(:host_user) { FactoryBot.create(:user, :with_battles) }
  let(:json_response) { JSON.parse(response.body) }

  subject { get "/api/v1/home", as: :json }

  shared_examples "Successful case" do |status|
    it "バトル一覧が取得できる" do
      subject
      expect(response).to have_http_status(status)
      expect(response.content_type).to start_with('application/json')

      if json_response["active_battles"].empty?
        expect(json_response["active_battles"]).to eq([])
      else
        json_response["active_battles"].each do |battle|
          expect(battle["status"]).to eq("active")
          expect(battle).to have_key("id")
          expect(battle).to have_key("title")
          expect(battle).to have_key("detail")
          expect(battle).to have_key("level")
          expect(battle).to have_key("status")
          expect(battle).to have_key("created_at")
          expect(battle).to have_key("updated_at")
          expect(battle).to have_key("host_user_id")
          expect(battle).to have_key("participants")
          expect(battle).to have_key("categories")

          battle["participants"].each do |participant|
            expect(participant).to have_key("user_id")
            expect(participant).to have_key("name")
          end

          battle["categories"].each do |category|
            expect(category).to have_key("id")
            expect(category).to have_key("name")
          end
        end
      end

      if json_response["waiting_battles"].empty?
        expect(json_response["waiting_battles"]).to eq([])
      else
        json_response["waiting_battles"].each do |battle|
          expect(battle["status"]).to eq("waiting")
          expect(battle).to have_key("id")
          expect(battle).to have_key("title")
          expect(battle).to have_key("detail")
          expect(battle).to have_key("level")
          expect(battle).to have_key("status")
          expect(battle).to have_key("created_at")
          expect(battle).to have_key("updated_at")
          expect(battle).to have_key("host_user_id")
          expect(battle).to have_key("participants")
          expect(battle).to have_key("categories")

          battle["participants"].each do |participant|
            expect(participant).to have_key("user_id")
            expect(participant).to have_key("name")
          end

          battle["categories"].each do |category|
            expect(category).to have_key("id")
            expect(category).to have_key("name")
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
    end

    # 正常系
    context "正常にバトル一覧が取得できる場合" do
      include_examples "Successful case", :ok
    end

    context "バトルが存在しない場合" do
      before do
        Battle.destroy_all
      end
      include_examples "Successful case", :ok
    end
  end

  context "セッションで認証されていない場合" do
    include_examples "Error case", :unauthorized, "認証されていないアクセスです。"
  end
end