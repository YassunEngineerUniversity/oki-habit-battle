# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  deleted_at      :datetime
#  email           :string(255)      not null
#  name            :string(255)      not null
#  password_digest :string(255)      not null
#  profile         :text(65535)
#  reword_total    :integer          default(0), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password
  has_one_attached :image

  validates :name, presence: true, length: { in: 1..255 }
  validates :email, presence: true, uniqueness: true, on: :create
  validates :password, length: { minimum: 6 }, on: :create
  validates :reword_total, presence: true
  validate :image_content_type
  validate :image_size
  

  def image_url
    Rails.application.routes.url_helpers.url_for(image) if image.attached?
  end

  def image_content_type
    if image.attached? && !image.content_type.in?(%w[image/jpeg image/png image/webp])
      errors.add(:image, "is not one of JPEG, PNG, or WEBP")
    end
  end

  def image_size
    if image.attached? && image.blob.byte_size > 1.megabytes
      errors.add(:image, "upload a file that is 1MB or less")
    end
  end
end
