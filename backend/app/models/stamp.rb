# == Schema Information
#
# Table name: stamps
#
#  id             :bigint           not null, primary key
#  generated_date :date
#  obtained       :boolean          default(FALSE), not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  user_id        :bigint           not null
#
# Indexes
#
#  index_stamps_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Stamp < ApplicationRecord
  include ImageHandling

  belongs_to :user
  has_one_attached :image

  validates :obtained, inclusion: { in: [true, false] }
  validates :user_id, uniqueness: { scope: :generated_date }
end
