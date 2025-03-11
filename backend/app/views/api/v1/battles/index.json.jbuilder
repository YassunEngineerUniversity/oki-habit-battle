json.array! @battles do |battle|
  json.id battle.id
  json.title battle.title
  json.detail battle.detail
  json.level battle.level
  json.created_at battle.created_at
  json.updated_at battle.updated_at

  json.participants battle.participants do |participaint|
    json.user_id participaint.id
    json.name participaint.name
  end
end

# レスポンス
# {
#   title: @battle.title,
#   detail: @battle.detail,
#   level: @battle.level,
#   battle_image: @battle.battle_image,
#   battle_amount: @battle.battle_amount,
#   participaints: {
#     id: @battle.participaints.id,
#     name: @battle.participaints.name,
#     avatar: @battle.participaints.avatar,
#   }
#   created_at: @battle.created_at,
#   updated_at: @battle.updated_at,
# }