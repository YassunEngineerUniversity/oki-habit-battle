# == Schema Information
#
# Table name: progresses
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  battle_id  :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_progresses_on_battle_id  (battle_id)
#  index_progresses_on_user_id    (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (battle_id => battles.id)
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe Progress, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
