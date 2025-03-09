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

  validates :name, presence: true, length: { in: 1..255 }
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }
  validates :reword_total, presence: true

  has_one_attached :image

  def image_url
    Rails.application.routes.url_helpers.url_for(image) if image.attached?
  end
end
