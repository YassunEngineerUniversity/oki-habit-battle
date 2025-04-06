# == Schema Information
#
# Table name: battle_progresses
#
#  id            :bigint           not null, primary key
#  progress_date :date             not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  battle_id     :bigint           not null
#  user_id       :bigint           not null
#
# Indexes
#
#  index_battle_progresses_on_battle_id  (battle_id)
#  index_battle_progresses_on_user_id    (user_id)
#  index_user_battle_progress_date_uniq  (user_id,battle_id,progress_date) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (battle_id => battles.id)
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe BattleProgress, type: :model do
  let!(:host_user) { FactoryBot.create(:user, :with_battles) }
  let!(:host_user_battle) { 
    host_user.battles.first.battle_history.update(status: Status::ACTIVE)
    host_user.battles.first
  }

  # 正常系
  context "モデルのバリデーションにかからない場合" do
    it "BattleProgressテーブルにレコードが作成される" do
      battle_progress = BattleProgress.new(user_id: host_user.id, battle_id: host_user_battle.id, progress_date: Time.zone.today)
      battle_progress.save
      expect(battle_progress).to be_valid
    end
  end

  # 異常系
  context "progress_dateがnilの場合" do
    it "バリデーションエラーが発生する" do
      battle_progress = BattleProgress.new(user_id: host_user.id, battle_id: host_user_battle.id, progress_date: nil)
      battle_progress.save
      expect(battle_progress.errors.messages[:progress_date]).to include("can't be blank")
    end
  end

  context "一日に複数回進捗を追加しようとした場合" do
    it "バリデーションエラーが発生する" do
      BattleProgress.create(user_id: host_user.id, battle_id: host_user_battle.id, progress_date: Time.zone.today)
      battle_progress = BattleProgress.new(user_id: host_user.id, battle_id: host_user_battle.id, progress_date: Time.zone.today)
      battle_progress.save
      expect(battle_progress.errors.messages[:user_id]).to include("has already been taken")
    end
  end
end
