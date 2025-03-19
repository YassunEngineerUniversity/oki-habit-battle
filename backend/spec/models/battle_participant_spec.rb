# == Schema Information
#
# Table name: battle_participants
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  battle_id  :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_battle_participants_on_battle_id  (battle_id)
#  index_battle_participants_on_user_id    (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (battle_id => battles.id)
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe BattleParticipant, type: :model do
  let!(:user) { FactoryBot.create(:user) }
  let!(:other_user) { FactoryBot.create(:user, :with_battles) }
  let!(:battle_participant) { FactoryBot.build(:battle_participant, user: user, battle: other_user.battles.sample) }

  # 正常系
  context "正常にバトル参加者が作成される場合" do
    it "BattleParticipantテーブルに保存される" do
      battle_participant.save
      expect(battle_participant).to be_valid

      saved_battle_participant = BattleParticipant.find_by(user_id: battle_participant.user_id, battle_id: battle_participant.battle_id)
      expect(saved_battle_participant).to be_present
    end
  end
end
