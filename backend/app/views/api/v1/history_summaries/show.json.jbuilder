json.stamps @stamps do |stamp|
  json.id stamp.id
  json.image_url stamp.image_url
  json.obtained stamp.obtained
  json.generated_date stamp.generated_date
end
json.reword_total @reword_total
json.battle_total @battle_total_count
json.max_consecutive_progress @max_consecutive_progress
json.weekly_progress_count @weekly_progress_count