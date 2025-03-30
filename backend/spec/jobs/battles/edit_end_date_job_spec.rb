require 'rails_helper'
require 'sidekiq/api'

RSpec.describe Battles::EditEndDateJob, type: :job do
  let!(:host_user) { FactoryBot.create(:user) }
  let!(:battle) { FactoryBot.create(:battle, host_user: host_user) }

  describe "perform" do
    let(:scheduled_jobs) { double('scheduled_jobs', display_class: 'Battles::UpdateCompletedJob') }
    let(:scheduled_set) { double("scheduled_set") }

    before do
      ActiveJob::Base.queue_adapter = :test
      allow(scheduled_jobs).to receive(:[]).with("args").and_return([{ "arguments" => [battle.id] }])
      allow(scheduled_jobs).to receive(:delete)
      allow(Sidekiq::ScheduledSet).to receive(:new).and_return(scheduled_set)
    end

    # 正常系
    context "正常にジョブが実行される場合" do
      before do
        allow(scheduled_set).to receive(:scan).with("Battles::UpdateCompletedJob").and_return([scheduled_jobs])
      end

      it "ジョブが削除され、新しいジョブが生成される" do
        Battles::EditEndDateJob.perform_now(battle.id, battle.battle_end_date.to_s)
        expect(ActiveJob::Base.queue_adapter.enqueued_jobs.count).to eq(1)
      end
    end

    # 異常系
    context "バトルIDが無効でBattleが見つからない場合" do
      it "NotFoundParameterErrorが発生する" do
        expect {
          Battles::EditEndDateJob.new.perform(nil, battle.battle_end_date.to_s)
        }.to raise_error(NotFoundParameterError)
      end
    end

    context "バトル開始時間が無効でBattleが見つからない場合" do
      it "NotFoundParameterErrorが発生する" do
        expect {
          Battles::EditEndDateJob.new.perform(battle.id, nil)
        }.to raise_error(NotFoundParameterError)
      end
    end

    context "ScheduledJobが見つからない場合" do
      before do
        allow(scheduled_set).to receive(:scan).with("Battles::UpdateCompletedJob").and_return([])
      end
      it "NotFoundScheduledJobErrorが発生する" do
        expect {
          Battles::EditEndDateJob.new.perform(battle.id, battle.battle_end_date.to_s)
        }.to raise_error(DeletingScheduledJob::NotFoundScheduledJobError)
      end
    end
  end
end
