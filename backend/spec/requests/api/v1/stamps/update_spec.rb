require 'rails_helper'

RSpec.describe "stamps_controller update", type: :request do
  let!(:host_user) { FactoryBot.create(:user) }
  let!(:stamp_with_host_user) { FactoryBot.create(:stamp, user: host_user) }
  let(:json_response) { JSON.parse(response.body) }

  subject { put "/api/v1/stamps/today", as: :json }

  shared_examples "Successful case" do | status, success_message |
    it "本日のスタンプの取得フラグの更新に成功" do
      subject

      expect(response).to have_http_status(status)
      expect(response.content_type).to start_with('application/json')
      expect(json_response["message"]).to eq(success_message)

      # DBにレコードが追加されているか確認
      stamp = host_user.stamps.find_by(generated_date: Time.zone.today)
      expect(stamp).to be_present
      expect(stamp_with_host_user.reload.obtained).to eq(true)
    end
  end

  shared_examples "Error case" do | status, error_message |
    it "本日のスタンプの取得に失敗" do
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
    context "正常にスタンプが取得できる場合" do
      include_examples "Successful case", :ok, "本日のスタンプを取得しました"
    end

    # 異常系
    context "本日のスタンプが既に取得済みの場合" do
      before do
        stamp_with_host_user.update(obtained: true)
      end

      include_examples "Error case", :bad_request, "スタンプは既に取得済みです"
    end

    context "本日以外のスタンプの取得フラグの更新しようとした場合" do
      before do
        stamp_with_host_user.update(generated_date: Time.zone.yesterday)
      end

      include_examples "Error case", :not_found, "スタンプが見つかりません"
    end

    context "本日以外のスタンプの取得フラグの更新しようとした場合" do
      before do
        stamp_with_host_user.update(generated_date: Time.zone.tomorrow)
      end

      include_examples "Error case", :not_found, "スタンプが見つかりません"
    end
  end

  context "セッションで認証されていない場合" do
    include_examples "Error case", :unauthorized, "認証されていないアクセスです。"
  end
end
