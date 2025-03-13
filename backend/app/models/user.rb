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
  include ImageHandling

  has_secure_password
  has_one_attached :image
  has_many :battles, foreign_key: :host_user_id, dependent: :destroy

  validates :name, presence: true, length: { in: 1..255 }
  validates :email, presence: true, uniqueness: true, on: :create
  validates :password, length: { minimum: 6 }, on: :create
  validates :reword_total, presence: true

end
