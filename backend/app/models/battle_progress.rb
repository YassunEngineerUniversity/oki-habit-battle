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
class BattleProgress < ApplicationRecord
  belongs_to :user
  belongs_to :battle

  validates :progress_date, presence: true
  validates :user_id, uniqueness: { scope: [ :battle_id, :progress_date ] }

  scope :weekly_progress, ->(start_date, end_date) { where(progress_date: start_date..end_date)}
end
