require 'rails_helper'

RSpec.describe Battles::UpdateStatusJob, type: :job do
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
          Battles::UpdateStatusJob.perform_later(battle.id)
        }.to have_enqueued_job(Battles::UpdateStatusJob)
      end
  
      it "対戦のtotal_hpとper_bonusが計算され、更新される" do
        expect {
          Battles::UpdateStatusJob.perform_now(battle.id)
        }.to change { battle.reload.total_hp }
        .and change { battle.reload.per_bonus }
      end

      it "対戦のステータスがActiveに更新される" do
        Battles::UpdateStatusJob.perform_now(battle.id)
        expect(battle.reload.battle_history.status).to eq("active")
      end
    end

    # 異常系
    context "Battleが見つからない場合" do
      it "ActiveRecord::RecordNotFoundが発生する" do
        expect {
          Battles::UpdateStatusJob.new.perform(9999)
        }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end


