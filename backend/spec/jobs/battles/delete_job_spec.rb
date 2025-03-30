require 'rails_helper'
require 'sidekiq/api'

RSpec.describe Battles::DeleteJob, type: :job do
  let!(:host_user) { FactoryBot.create(:user) }
  let!(:battle) { FactoryBot.create(:battle, host_user: host_user) }

  describe "perform" do
    let(:scheduled_jobs) { double('scheduled_jobs', display_class: 'Battles::UpdateStatusJob') }
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
        allow(scheduled_set).to receive(:scan).with("Battles::UpdateStatusJob").and_return([scheduled_jobs])
      end

      it "ジョブが削除される" do
        Battles::DeleteJob.perform_now(battle.id)
      end
    end

    # 異常系
    context "Battleが見つからない場合" do
      it "NotFoundParameterErrorが発生する" do
        expect {
          Battles::DeleteJob.new.perform(nil)
        }.to raise_error(NotFoundParameterError)
      end
    end

    context "ScheduledJobが見つからない場合" do
      before do
        allow(scheduled_set).to receive(:scan).with("Battles::UpdateStatusJob").and_return([])
      end
      it "NotFoundScheduledJobErrorが発生する" do
        expect {
          Battles::DeleteJob.new.perform(battle.id)
        }.to raise_error(NotFoundScheduledJobError)
      end
    end
  end
end
