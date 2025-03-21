require 'rails_helper'

RSpec.describe "battles_histories_controller me", type: :request do
  let!(:host_user) { FactoryBot.create(:user, :with_battles, battles_count: 30) }
  let(:json_response) { JSON.parse(response.body) }
  
  # 1ページあたりの表示件数
  let(:per_page) { 10 }

  subject { get "/api/v1/battles/histories/me", params: query_params, as: :json }

  shared_examples "Successful case" do | status |
    it "バトル一覧が取得できる" do
      subject
      expect(response).to have_http_status(status)
      
      if json_response["battles"].empty?
        expect(json_response["battles"]).to eq([])
      else
        json_response["battles"].each do |battle|
          # バトルのステータスがcompletedのもののみ取得されていることを確認
          expect(battle["status"]).to eq("completed")

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
          
          battle["categories"].each do |category|
            expect(category).to have_key("id")
            expect(category).to have_key("name")
          end
        end
      end
    end
  end

  shared_examples "Successful case with pagination" do | status, current_page |
    it "10件のバトル一覧が取得できる" do
      host_user.battles.each_with_index do |battle, index|
        next if index == 20
        battle.battle_history.update(status: "completed")
      end

      subject
      expect(response).to have_http_status(status)
      expect(json_response["battles"].count).to eq(per_page)
      expect(json_response["pagination"]["page"]).to eq(current_page)
      expect(json_response["pagination"]["per_page"]).to eq(per_page)
    end
  end

  shared_examples "Error case" do | status, error_message |
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
      let(:query_params) { {} }
      include_examples "Successful case", :ok
    end

    context "カテゴリーパラメータが指定されている場合" do
      let(:query_params) { { category: "プログラミング" } }
      include_examples "Successful case", :ok
    end

    context "レベルパラメータが指定されている場合" do
      let(:query_params) { { level: "A" } }
      include_examples "Successful case", :ok
    end

    context "ソート順パラメータが指定されている場合" do
      let(:query_params) { { order: "asc" } }
      include_examples "Successful case", :ok
    end

    context "パラメータが複数ついている場合" do
      let(:query_params) { { category: "プログラミング", level: "A", order: "asc", q: "バトル" } }
      include_examples "Successful case", :ok
    end

    context "無効なパラメータが指定されている場合" do
      let(:query_params) { { invalid: "invalid", query: "invalid" } }
      include_examples "Successful case", :ok
    end

    context "バトルが存在しない場合" do
      before do
        Battle.destroy_all
      end
      let(:query_params) { {} }
      include_examples "Successful case", :ok
    end

    context "最初のページの場合" do
      let(:query_params) { { page: 1 } }
      include_examples "Successful case with pagination", :ok, 1
    end

    context "2ページ目の場合" do
      let(:query_params) { { page: 2 } }
      include_examples "Successful case with pagination", :ok, 2
    end
  end

  context "セッションで認証されていない場合" do
    let(:query_params) { {} }
    include_examples "Error case", :unauthorized, "認証されていないアクセスです。"
  end
end