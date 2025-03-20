# == Schema Information
#
# Table name: battle_favorites
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  battle_id  :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_battle_favorites_on_battle_id              (battle_id)
#  index_battle_favorites_on_user_id                (user_id)
#  index_battle_favorites_on_user_id_and_battle_id  (user_id,battle_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (battle_id => battles.id)
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe BattleFavorite, type: :model do
  let!(:user) { FactoryBot.create(:user) }
  let!(:other_user) { FactoryBot.create(:user, :with_battles) }

  # 正常系
  context "正常にDBに保存される場合" do
    it "BattleFavoriteに保存される" do
      battle = other_user.battles.first
      battle_favorite = BattleFavorite.new(user: user, battle: battle)
      battle_favorite.save
      expect(battle_favorite).to be_valid

      expect(BattleFavorite.count).to eq 1
      expect(BattleFavorite.last.user).to eq user
      expect(BattleFavorite.last.battle).to eq battle
    end
  end

  # 異常系
  context "すでにDBに保存されている場合" do
    it "uniquenessのエラーが発生する" do
      battle = other_user.battles.first
      BattleFavorite.create(user: user, battle: battle)

      count = BattleFavorite.count
      battle_favorite = BattleFavorite.new(user: user, battle: battle)
      battle_favorite.save
      expect(battle_favorite).to be_invalid

      expect(BattleFavorite.count).to eq count
    end
  end
end
