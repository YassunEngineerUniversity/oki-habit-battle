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

# Create 3 users
users = []
3.times do |i|
  users << User.create!(
    name: "ユーザー#{i + 1}",
    email: "user#{i + 1}@example.com",
    password: "password",
    image_url: "",
    profile: "ユーザー#{i + 1}のプロフィールです。趣味は#{['読書', '映画鑑賞', 'ジョギング', '料理', 'ゲーム'].sample(2).join('と')}です。",
    deleted: false,
    reword_total: 0
  )
end