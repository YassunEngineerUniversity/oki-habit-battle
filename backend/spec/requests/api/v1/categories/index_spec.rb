require 'rails_helper'

RSpec.describe "categories_controller index", type: :request do
  let!(:user) { FactoryBot.create(:user) }
  let!(:categories) { FactoryBot.create_list(:category, 10) }
  let(:json_response) { JSON.parse(response.body) }

  subject { get "/api/v1/battle-categories" }

  shared_examples "Successful case" do | status |
    it "カテゴリー一覧を取得できる" do
      subject
      expect(response).to have_http_status(status)
      battle_categories = Category.all
      expect(json_response.length).to eq(battle_categories.length)

      json_response.each_with_index do |category, index|
        expect(category["id"]).to eq(battle_categories[index].id)
        expect(category["name"]).to eq(battle_categories[index].name)
        expect(category["image_url"]).to eq(battle_categories[index].image_url)
      end
    end
  end

  shared_examples "Error case" do | status, error_message |
    it "カテゴリー一覧を取得できない" do
      subject
      expect(response).to have_http_status(status)
      expect(json_response["errors"]).to eq(error_message)
    end
  end

  context "セッションで認証されている場合" do
    before do
      post "/api/v1/login", params: { email: user.email, password: user.password }
    end

    # 正常系
    context "正常にカテゴリー一覧が取得できる場合" do
      include_examples "Successful case", :ok
    end
  end

  context "セッションで認証されていない場合" do
    include_examples "Error case", :unauthorized, "認証されていないアクセスです。"
  end
end