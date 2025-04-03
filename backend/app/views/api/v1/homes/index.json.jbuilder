json.active_battles do
  json.array! @active_battles do |battle|
    json.id battle.id
    json.title battle.title
    json.detail battle.detail
    json.image battle.image_url
    json.level battle.level
    json.status battle.battle_history.status
    json.created_at battle.created_at
    json.updated_at battle.updated_at
    json.host_user_id battle.host_user_id

    json.participants battle.participants do |participaint|
      json.user_id participaint.id
      json.name participaint.name
      json.avatar participaint.image_url
    end

    json.categories battle.categories do |category|
      json.id category.id
      json.name category.name
    end
  end
end

json.waiting_battles do
  json.array! @waiting_battles do |battle|
    json.id battle.id
    json.title battle.title
    json.detail battle.detail
    json.image battle.image_url
    json.level battle.level
    json.status battle.battle_history.status
    json.created_at battle.created_at
    json.updated_at battle.updated_at
    json.host_user_id battle.host_user_id

    json.participants battle.participants do |participaint|
      json.user_id participaint.id
      json.name participaint.name
      json.avatar participaint.image_url
    end

    json.categories battle.categories do |category|
      json.id category.id
      json.name category.name
    end
  end
end