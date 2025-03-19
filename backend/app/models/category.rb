# == Schema Information
#
# Table name: categories
#
#  id         :bigint           not null, primary key
#  name       :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Category < ApplicationRecord
  include ImageHandling

  has_many :battle_categories, dependent: :destroy
  has_many :battles, through: :battle_categories

  self.image_attachment_name = :category_image
  has_one_attached :category_image

  validates :name, presence: true, length: { in: 1..255 }
end
