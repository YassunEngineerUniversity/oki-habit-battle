json.progresses @progresses do |progress|
  json.progress_date progress.progress_date
end
json.reword_total @reword_total
json.battle_total @battle_total_count
json.max_consecutive_progress @max_consecutive_progress
json.weekly_progress_count @weekly_progress_count