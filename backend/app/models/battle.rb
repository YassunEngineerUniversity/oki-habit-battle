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
#  reword            :integer          not null
#  title             :string(255)      not null
#  total_hp          :integer          not null
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
class Battle < ApplicationRecord
  include ImageHandling

  belongs_to :host_user, class_name: "User"
  has_one :battle_history, dependent: :destroy

  has_many :battle_participants, dependent: :destroy
  has_many :participants, through: :battle_participants, source: :user

  has_many :battle_categories, dependent: :destroy
  has_many :categories, through: :battle_categories

  self.image_attachment_name = :backimage_image
  has_one_attached :backimage_image
end
