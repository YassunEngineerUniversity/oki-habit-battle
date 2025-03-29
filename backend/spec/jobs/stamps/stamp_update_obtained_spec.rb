require 'rails_helper'

RSpec.describe Stamps::StampUpdateObtainedJob, type: :job do
  let!(:host_user) { FactoryBot.create(:user) }
  let!(:stamp) { FactoryBot.create(:stamp, user: host_user) }

  describe "perform" do
    # 正常系
    context "正常にジョブが実行される場合" do
      it "スタンプのobtainedがtrueになる" do
        Stamps::StampUpdateObtainedJob.perform_now(stamp.id)
        expect(stamp.reload.obtained).to eq(true)
      end
    end

    # 異常系
    context "Stampが見つからない場合" do
      it "ActiveRecord::RecordNotFoundが発生する" do
        expect {
          Stamps::StampUpdateObtainedJob.new.perform(9999)
        }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end