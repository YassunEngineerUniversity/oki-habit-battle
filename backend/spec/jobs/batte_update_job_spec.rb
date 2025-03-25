require 'rails_helper'
require 'sidekiq/api'

RSpec.describe Battles::BattleUpdateJob, type: :job do
  let!(:host_user) { FactoryBot.create(:user) }
  let!(:battle) { FactoryBot.create(:battle, host_user: host_user) }

  describe "perform" do
    before do
      ActiveJob::Base.queue_adapter = :test
      scheduled_jobs = double('scheduled_jobs', display_class: 'Battles::BattleUpdateStatusJob')
      allow(scheduled_jobs).to receive(:[]).with("args").and_return([{ "arguments" => [battle.id] }])
      allow(scheduled_jobs).to receive(:delete)
      scheduled_set = double("scheduled_set")
      allow(Sidekiq::ScheduledSet).to receive(:new).and_return(scheduled_set)
      allow(scheduled_set).to receive(:scan).with("Battles::BattleUpdateStatusJob").and_return([scheduled_jobs])
    end

    # 正常系
    it "ジョブが削除される" do
      Battles::BattleUpdateJob.perform_now(battle.id, battle.battle_start_date.to_s)
      expect(ActiveJob::Base.queue_adapter.enqueued_jobs.count).to eq(1)
    end
  end
end
