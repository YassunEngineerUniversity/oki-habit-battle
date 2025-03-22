require 'rails_helper'

RSpec.describe "Api::V1::HistorySummaries", type: :request do
  let!(:host_user) { FactoryBot.create(:user, :with_battles) }
  let(:json_response) { JSON.parse(response.body) }

  subject { get "/api/v1/history-summary", as: :json }

  shared_examples "Successful case" do | status, max_consecutive_progress |
    it "ユーザーの戦歴サマリーが取得できる" do
      subject
      expect(response).to have_http_status(status)
      
      if host_user.battle_progresses.count > 0
        host_user.battle_progresses.each_with_index do |progress, index|
          expect(json_response["progresses"][index]["battle_id"]).to eq(progress.battle_id)
          expect(json_response["progresses"][index]["progress_date"]).to eq(progress.progress_date.strftime("%Y-%m-%d"))
        end
      else
        expect(json_response["progresses"]).to be_empty
      end

      expect(json_response["reword_total"]).to eq(host_user.reword_total)
      expect(json_response["battle_total"]).to eq(host_user.battles.count)

      weekly_progress = host_user.battle_progresses.weekly_progress(Time.zone.today.beginning_of_week, Time.zone.today.end_of_week).select(:progress_date).distinct.count
      expect(json_response["weekly_progress_count"]).to eq(weekly_progress)
      expect(json_response["max_consecutive_progress"]).to eq(max_consecutive_progress)
    end
  end

  shared_examples "Error case" do | status, error_message |
    it "ユーザーの戦歴サマリーが取得できない" do
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
    context "ユーザーの戦歴サマリーが0件の場合" do
      include_examples "Successful case", :ok, 0
    end

    context "ユーザーの戦歴サマリーが1件の場合" do
      before do
        FactoryBot.create(:battle_progress, user: host_user, battle: host_user.battles.sample, progress_date: Time.zone.today)
      end
      include_examples "Successful case", :ok, 1
    end

    context "ユーザーの戦歴サマリーが複数件の場合" do
      before do
        5.times do |index|
          FactoryBot.create(:battle_progress, user: host_user, battle: host_user.battles.sample, progress_date: Time.zone.today - index.day)
        end
      end
      include_examples "Successful case", :ok, 5
    end

    context "同じ対戦に対して連続した進捗がある場合" do
      before do
        5.times do |index|
          FactoryBot.create(:battle_progress, user: host_user, battle: host_user.battles.first, progress_date: Time.zone.today - index.day)
        end
      end
      include_examples "Successful case", :ok, 5
    end

    context "現在続いている連続した進捗より過去の連続した進捗が大きい場合" do
      before do
        5.times do |index|
          FactoryBot.create(:battle_progress, user: host_user, battle: host_user.battles.first, progress_date: 100.day.ago - index.day)
        end
        3.times do |index|
          FactoryBot.create(:battle_progress, user: host_user, battle: host_user.battles.first, progress_date: Time.zone.today - index.day)
        end
      end
      include_examples "Successful case", :ok, 5
    end

  end

  context "セッションで認証されていない場合" do
    include_examples "Error case", :unauthorized, "認証されていないアクセスです。"
  end
end
