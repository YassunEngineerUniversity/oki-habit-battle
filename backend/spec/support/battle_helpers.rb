module BattleHelpers
  def valid_battle_attributes(overrides = {})
    {
      title: Faker::Lorem.word,
      apply_start_date: Faker::Time.between(from: DateTime.now - 1, to: DateTime.now),
      apply_end_date: Faker::Time.between(from: DateTime.now, to: DateTime.now + 3),
      battle_start_date: Faker::Time.between(from: DateTime.now + 3, to: DateTime.now + 5),
      battle_end_date: Faker::Time.between(from: DateTime.now + 8, to: DateTime.now + 10),
      participant_limit: (1..5).to_a.sample,
      detail: Faker::Lorem.sentence,
      achievement_rate: [50, 60, 70, 80, 90, 100].sample,
      backimage_image: png_image,
      categories: [
        { id: categories[0].id, name: categories[0].name },
        { id: categories[1].id, name: categories[1].name }
      ]
    }.merge(overrides)
  end
end
