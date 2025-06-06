require 'rails_helper'

RSpec.describe Battles::UpdateCompletedJob, type: :job do
  let!(:host_user) { FactoryBot.create(:user) }
  let!(:battle) { FactoryBot.create(:battle, host_user: host_user) }

  describe "perform" do
    before do
      ActiveJob::Base.queue_adapter = :test
    end
    # 正常系
    context "正常にジョブが実行される場合" do
      it "ジョブがキューに追加される" do
        expect {
          Battles::UpdateCompletedJob.perform_later(battle.id)
        }.to have_enqueued_job(Battles::UpdateCompletedJob)
      end

      it "対戦のステータスがCompletedに更新される" do
        Battles::UpdateCompletedJob.perform_now(battle.id)
        expect(battle.reload.battle_history.status).to eq("complete")
      end
    end

    # 異常系
   
  end
end


