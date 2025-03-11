# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


User.destroy_all
Battle.destroy_all

  # Create 3 users
  users = []
  3.times do |i|
    users << User.create!(
      name: "ユーザー#{i + 1}",
      email: "user#{i + 1}@example.com",
      password: "password",
      profile: "ユーザー#{i + 1}のプロフィールです。趣味は#{['読書', '映画鑑賞', 'ジョギング', '料理', 'ゲーム'].sample(2).join('と')}です。",
      deleted_at: nil,
      reword_total: 0
    )
  end

  battles = []
  battle_levels = ["E", "D", "C", "B", "A", "AA", "AAA", "S", "SS", "SSS"]
  status = ["waiting", "active", "complete"]
  10.times do |i|
    battles << Battle.create!(
      title: "バトル#{i + 1}",
      apply_start_date: Time.current + i.days,
      apply_end_date: Time.current + i.days + 1.day,
      battle_start_date: Time.current + i.days + 2.days,
      battle_end_date: Time.current + i.days + 3.days,
      reword: (i + 1) * 100,
      detail: "これはバトル#{i + 1}の詳細です。参加して熱い戦いを繰り広げましょう！",
      achievement_rate: [50, 60, 70, 80, 90, 100].sample,
      total_hp: 1000,
      level: battle_levels.sample,
      host_user_id: users.sample.id
    )

    BattleParticipant.create!(
      user_id: battles[i].host_user_id,
      battle_id: battles[i].id
    )

    BattleHistory.create!(
      status: status.sample,
      battle_id: battles[i].id,
    )
  end

  3.times do |i|
    for battle in battles
      if battle.host_user_id != users[i].id
        BattleParticipant.create!(
          user_id: users[i].id,
          battle_id: battle.id
        )
        break
      end
    end
  end

