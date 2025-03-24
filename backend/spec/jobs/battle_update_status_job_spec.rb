require 'rails_helper'

RSpec.describe Battles::BattleUpdateStatusJob, type: :job do
  let!(:host_user) { FactoryBot.create(:user) }
  let!(:battle) { FactoryBot.create(:battle, host_user: host_user) }

  describe "perform" do
    before do
      ActiveJob::Base.queue_adapter = :test
    end
    # 正常系
    context "非同期にスケジュールされたジョブが実行される場合" do
      it "ジョブがキューに追加される" do
        Battles::BattleUpdateStatusJob.perform_later(battle.id)
        expect(Battles::BattleUpdateStatusJob).to have_been_enqueued
      end
  
      it "対戦のステータスがActiveに更新される" do
        Battles::BattleUpdateStatusJob.perform_now(battle.id)
        battle.reload
        expect(battle.battle_history.status).to eq("active")
      end
    end

    # 異常系
    context "Updateが失敗した場合" do
      before do
        allow(Battle).to receive(:find_by).with(id: battle.id).and_return(battle)
        allow(battle.battle_history).to receive(:update!).and_raise(ActiveRecord::RecordInvalid)
      end
      
      it "例外するとジョブがリトライされる" do
        Battles::BattleUpdateStatusJob.perform_now(battle.id)
        expect(Battles::BattleUpdateStatusJob).to have_been_enqueued
      end
    end
  end
end


