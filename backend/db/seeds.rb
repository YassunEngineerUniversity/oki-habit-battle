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
BattleParticipant.destroy_all
BattleCategory.destroy_all
Category.destroy_all

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

  categories = [
    { name: "健康", query: "health", image: "category-health.png" },
    { name: "生活習慣", query: "lifestyle", image: "category-lifestyle.png" },
    { name: "プログラミング", query: "programming", image: "category-programming.png" },
    { name: "英語", query: "english", image: "category-english.png" },
    { name: "読書", query: "reading", image: "category-reading.png" },
    { name: "映画", query: "movies", image: "category-movies.png" },
    { name: "音楽", query: "music", image: "no-image-category.png" },
    { name: "スポーツ", query: "sports", image: "no-image-category.png" },
    { name: "料理", query: "cooking", image: "no-image-category.png" },
    { name: "ゲーム", query: "gaming", image: "no-image-category.png" },
    { name: "旅行", query: "travel", image: "no-image-category.png" },
    { name: "その他", query: "other", image: "no-image-category.png" }
  ]

  categories.each do |category|
    Category.create!(
      name: category[:name],
      query: category[:query],
      category_image: ActiveStorage::Blob.create_and_upload!(
        io: File.open(Rails.root.join("app/assets/images/categories/#{category[:image]}")),
        filename: category[:image]
      )
    )
  end

  battles = []
  battle_levels = ["E", "D", "C", "B", "A", "AA", "AAA", "S", "SS", "SSS"]
  status = ["waiting", "active", "completed"]
  20.times do |i|
    battles << Battle.create!(
      title: "バトル#{i + 1}",
      apply_start_date: Time.current + i.days,
      apply_end_date: Time.current + i.days + 1.day,
      battle_start_date: Time.current + i.days + 2.days,
      battle_end_date: Time.current + i.days + 3.days,
      per_reword: (1..350).to_a.sample,
      per_bonus: nil,
      participant_limit: 3,
      detail: "これはバトル#{i + 1}の詳細です。参加して熱い戦いを繰り広げましょう！",
      achievement_rate: [50, 60, 70, 80, 90, 100].sample,
      total_hp: nil,
      level: battle_levels.sample,
      host_user_id: users.sample.id
    )
  end

  battles.each do |battle|
    BattleParticipant.create!(
      user_id: battle.host_user_id,
      battle_id: battle.id
    )
  
    BattleHistory.create!(
      status: Status::WAITING,
      battle_id: battle.id,
    )
  
    BattleCategory.create!(
      battle_id: battle.id,
      category_id: Category.all.sample.id
    )
  end


  users.each do |user|
    battle = battles.find { |battle| battle.host_user_id != user.id }
    if battle
      BattleParticipant.create!(
        user_id: user.id,
        battle_id: battle.id
      )
    end
  end

  # Create FavoriteBattles
  users.each do |user|
    others_battles = Battle.where.not(host_user_id: user.id)
    others_battles.each do |battle|
      BattleFavorite.create!(
        user_id: user.id,
        battle_id: battle.id
      )
    end
  end

  # Create BattleProgresses
  3.times do |i|
    users.each do |user|
      battle = battles.sample

      BattleProgress.create!(
        user_id: user.id,
        battle_id: battle.id,
        progress_date: Time.current + i.days
      )
    end
  end
