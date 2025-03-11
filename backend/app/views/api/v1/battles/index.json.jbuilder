json.array! @battles do |battle|
  json.id battle.id
  json.title battle.title
  json.detail battle.detail
  json.level battle.level
  json.status battle.battle_history.status
  json.created_at battle.created_at
  json.updated_at battle.updated_at

  json.participants battle.participants do |participaint|
    json.user_id participaint.id
    json.name participaint.name
  end
end