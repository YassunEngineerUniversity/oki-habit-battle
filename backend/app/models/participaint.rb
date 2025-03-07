# == Schema Information
#
# Table name: participaints
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  battle_id  :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_participaints_on_battle_id  (battle_id)
#  index_participaints_on_user_id    (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (battle_id => battles.id)
#  fk_rails_...  (user_id => users.id)
#
class Participaint < ApplicationRecord
end
