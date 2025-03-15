# == Schema Information
#
# Table name: battles
#
#  id                :bigint           not null, primary key
#  achievement_rate  :integer          not null
#  apply_end_date    :datetime         not null
#  apply_start_date  :datetime         not null
#  battle_end_date   :datetime         not null
#  battle_start_date :datetime         not null
#  detail            :text(65535)      not null
#  level             :string(255)
#  participant_limit :integer          default(1), not null
#  per_bonus         :integer
#  per_reword        :integer          not null
#  title             :string(255)      not null
#  total_hp          :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  host_user_id      :bigint           not null
#
# Indexes
#
#  index_battles_on_host_user_id  (host_user_id)
#
# Foreign Keys
#
#  fk_rails_...  (host_user_id => users.id)
#
require 'rails_helper'

RSpec.describe Battle, type: :model do
  let!(:user) { FactoryBot.create(:user) }
  let!(:valid_battle) { FactoryBot.build(:battle, host_user:user) }

  shared_examples "Error Case" do | error_target, error_message |
    let(:invalid_battle) { FactoryBot.build(:battle, host_user:user) }

    it "バリデーションエラーが発生する" do
      subject
      invalid_battle.save
      expect(invalid_battle).not_to be_valid
      expect(invalid_battle.errors[error_target]).to include(error_message)
    end
  end

  # 正常系
  context "正常にバトルが作成される場合" do
    it "新規バトルが作成される" do
      valid_battle.save
      expect(valid_battle).to be_valid

      saved_valid_battle = Battle.find_by(detail: valid_battle.detail)
      expect(saved_valid_battle).to be_present
    end
  end

  # 異常系
  context "タイトルが空の場合" do
    subject { invalid_battle.title = "" }
    include_examples "Error Case", :title, "can't be blank"
  end

  context "募集開始日が空の場合" do
    subject { invalid_battle.apply_start_date = nil }
    include_examples "Error Case", :apply_start_date, "can't be blank"
  end

  context "募集終了日が空の場合" do
    subject { invalid_battle.apply_end_date = nil }
    include_examples "Error Case", :apply_end_date, "can't be blank"
  end

  context "バトル開始日が空の場合" do
    subject { invalid_battle.battle_start_date = nil }
    include_examples "Error Case", :battle_start_date, "can't be blank"
  end

  context "バトル終了日が空の場合" do
    subject { invalid_battle.battle_end_date = nil }
    include_examples "Error Case", :battle_end_date, "can't be blank"
  end

  context "報酬が空の場合" do
    subject { invalid_battle.per_reword = nil }
    include_examples "Error Case", :per_reword, "can't be blank"
  end

  context "詳細が空の場合" do
    subject { invalid_battle.detail = "" }
    include_examples "Error Case", :detail, "can't be blank"
  end

  context "達成率が空の場合" do
    subject { invalid_battle.achievement_rate = nil }
    include_examples "Error Case", :achievement_rate, "can't be blank"
  end

  context "参加人数が空の場合" do
    subject { invalid_battle.participant_limit = nil }
    include_examples "Error Case", :participant_limit, "can't be blank"
  end

  context "タイトルが255字以上の場合" do
    subject { invalid_battle.title = Faker::Lorem.characters(number: 256) }
    include_examples "Error Case", :title, "is too long (maximum is 255 characters)"
  end

  context "報酬が0以下の場合" do
    subject { invalid_battle.per_reword = 0 }
    include_examples "Error Case", :per_reword, "must be greater than or equal to 1"
  end

  context "報酬が351以上の場合" do
    subject { invalid_battle.per_reword = 351 }
    include_examples "Error Case", :per_reword, "must be less than or equal to 350"
  end

  context "参加人数が0以下の場合" do
    subject { invalid_battle.participant_limit = 0 }
    include_examples "Error Case", :participant_limit, "must be greater than or equal to 1"
  end
  
  context "参加人数が6以上の場合" do
    subject { invalid_battle.participant_limit = 6 }
    include_examples "Error Case", :participant_limit, "must be less than or equal to 5"
  end
end
