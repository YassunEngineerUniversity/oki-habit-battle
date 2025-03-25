require 'rails_helper'

RSpec.describe Stamps::StampImageJob, type: :job do
  let!(:host_user) { FactoryBot.create(:user) }
  let!(:battle) { FactoryBot.create(:battle, host_user: host_user) }
  let!(:stamp) { FactoryBot.create(:stamp, user: host_user) }

  describe "perform" do
    let(:openai_client_mock) { instance_double(Stamps::OpenaiService) }

    before do
      ActiveJob::Base.queue_adapter = :test
      allow(Stamps::OpenaiService).to receive(:new).and_return(openai_client_mock)
    end

    # 正常系
    context "正常にジョブが実行される場合" do
      before do
        allow(openai_client_mock).to receive(:generate_stamp).and_return("https://zukan.pokemon.co.jp/zukan-api/up/images/index/8ac25cd367875f2ddafc63bd9e0081c4.png")
      end

      it "ジョブがキューに追加される" do
        expect {
          Stamps::StampImageJob.perform_later(stamp.id)
        }.to have_enqueued_job(Stamps::StampImageJob)
      end
  
      it "スタンプの画像がActiveStorageに保存される" do
        expect {
          Stamps::StampImageJob.perform_now(stamp.id)
        }.to change { stamp.reload.image.attached? }.from(false).to(true)
      end
    end

    # 異常系
    context "OpenAI側でエラーがあり、nilが返される場合" do
      before do
        allow(openai_client_mock).to receive(:generate_stamp).and_return(nil)
      end

      it "OpenaiServiceErrorが発生する" do
        expect {
          Stamps::StampImageJob.new.perform(stamp.id)
        }.to raise_error(OpenaiServiceError)
      end
    end

    context "Stampが見つからない場合" do
      it "ActiveRecord::RecordNotFoundが発生する" do
        expect {
          Stamps::StampImageJob.new.perform(9999)
        }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end