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
require 'rails_helper'

RSpec.describe Stamp, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
