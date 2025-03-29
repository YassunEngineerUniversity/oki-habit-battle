require 'rails_helper'

RSpec.describe "stamps_controller index", type: :request do
  let!(:host_user) { FactoryBot.create(:user) }
  let!(:stamps) {
    10.times do |i|
      past = i + 1
      FactoryBot.create(:stamp, user: host_user, generated_date: Time.zone.today - past.days, obtained: true)
    end
  }
  let!(:today_stamp) { FactoryBot.create(:stamp, user: host_user, generated_date: Time.zone.today) }
  let(:json_response) { JSON.parse(response.body) }

  subject { get "/api/v1/stamps", as: :json }

  shared_examples "Successful case" do | status |
    it "本日のスタンプの一覧が取得に成功" do
      subject

      expect(response).to have_http_status(status)
      expect(response.content_type).to start_with('application/json')

      stamps_without_today = host_user.stamps.where.not(obtained: false)
      expect(json_response.count).to eq(stamps_without_today.count)

      if json_response.count == 0
        expect(json_response).to eq([])
      else
        json_response.each_with_index do |stamp, i|
          expect(stamp["id"]).to eq(host_user.stamps[i].id)
          expect(stamp["image_url"]).to eq(host_user.stamps[i].image_url)
          expect(stamp["obtained"]).to eq(host_user.stamps[i].obtained)
          expect(stamp["obtained"]).to eq(true)
          expect(stamp["generated_date"]).to eq(host_user.stamps[i].generated_date.strftime("%Y-%m-%d"))
        end
      end
    end
  end

  shared_examples "Error case" do | status, error_message |
    it "本日のスタンプの一覧が取得に失敗" do
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
    context "正常にスタンプの一覧が取得できる場合" do
      include_examples "Successful case", :ok
    end

    context "ユーザがスタンプをもっていない場合" do
      before do
        host_user.stamps.destroy_all
      end

      include_examples "Successful case", :ok
    end

    context "ユーザが本日のスタンプを取得した場合" do
      before do
        today_stamp.update(obtained: true)
      end

      include_examples "Successful case", :ok
    end

    # 異常系
   
  end

  context "セッションで認証されていない場合" do
    include_examples "Error case", :unauthorized, "認証されていないアクセスです。"
  end
end
