json.id @battle.id
json.title @battle.title
json.detail @battle.detail
json.apply_start_date @battle.apply_start_date
json.apply_end_date @battle.apply_end_date
json.battle_start_date @battle.battle_start_date
json.battle_end_date @battle.battle_end_date
json.reword @battle.reword
json.level @battle.level
json.achievement_rate @battle.achievement_rate
json.total_hp @battle.total_hp
json.host_user_id @battle.host_user_id
json.created_at @battle.created_at
json.updated_at @battle.updated_at

json.participants @battle.participants do |participaint|
  json.user_id participaint.id
  json.name participaint.name
end

json.categories @battle.categories do |category|
  json.id category.id
  json.name category.name
end
