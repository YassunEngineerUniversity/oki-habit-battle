json.id @active_battle.id
json.title @active_battle.title
json.detail @active_battle.detail
json.apply_start_date @active_battle.apply_start_date
json.apply_end_date @active_battle.apply_end_date
json.battle_start_date @active_battle.battle_start_date
json.battle_end_date @active_battle.battle_end_date
json.per_reword @active_battle.per_reword
json.per_bonus @active_battle.per_bonus
json.level @active_battle.level
json.achievement_rate @active_battle.achievement_rate
json.total_hp @active_battle.total_hp
json.host_user_id @active_battle.host_user_id
json.battle_period @battle_period
json.progress_count @active_battle_progress_count
json.is_today_progress @is_today_progress

json.participants @active_battle_participants do |participaint|
  json.user_id participaint[:user_id]
  json.name participaint[:name]
  json.avatar participaint[:avatar]
  json.progress_count participaint[:progress_count]
end

json.categories @active_battle.categories do |category|
  json.id category.id
  json.name category.name
end