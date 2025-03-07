# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  deleted         :boolean          default(FALSE), not null
#  email           :string(255)      not null
#  image_url       :string(255)
#  name            :string(255)      not null
#  password_digest :string(255)      not null
#  profile         :text(65535)
#  reword_total    :integer          default(0), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'rails_helper'

RSpec.describe User, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
