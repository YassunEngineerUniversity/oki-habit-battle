require 'rails_helper'

RSpec.describe "battles_controller index", type: :request do
  let!(:host_user) { FactoryBot.create(:user, :with_battles) }
  let(:json_response) { JSON.parse(response.body) }
  
  # 1ページあたりの表示件数
  let(:per_page) { 5 }

  subject { get "/api/v1/battles" }

  shared_examples "Successful case" do | status |
    FactoryBot.create_list(:user, 5, :with_battles)
    it "バトル一覧が取得できる" do
      subject
      expect(response).to have_http_status(status)
      expect(json_response.length).to eq(per_page)
      
      json_response.each do |battle|
        # 自分がhostではない、かつ、自分が参加していないバトルのみ取得されていることを確認
        expect(battle["participants"].map { |participant| participant["user_id"] }).not_to include(host_user.id)

        # バトルのステータスがwaitingのもののみ取得されていることを確認
        expect(battle["status"]).to eq("waiting")

        # バトルの詳細情報が取得されていることを確認
        expect(battle).to have_key("id")
        expect(battle).to have_key("title")
        expect(battle).to have_key("detail")
        expect(battle).to have_key("level")
        expect(battle).to have_key("status")
        expect(battle).to have_key("created_at")
        expect(battle).to have_key("updated_at")
        expect(battle).to have_key("participants")
        battle["participants"].each do |participant|
          expect(participant).to have_key("user_id")
          expect(participant).to have_key("name")
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

    context "正常にバトル一覧が取得できる場合" do
      include_examples "Successful case", :ok
    end
  end

  context "セッションで認証されていない場合" do
    include_examples "Error case", :unauthorized, "認証されていないアクセスです。"
  end
end