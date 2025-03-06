# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_03_06_122614) do
  create_table "battle_favorites", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "battle_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["battle_id"], name: "index_battle_favorites_on_battle_id"
    t.index ["user_id"], name: "index_battle_favorites_on_user_id"
  end

  create_table "battle_histories", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "status", default: "waiting", null: false
    t.bigint "battle_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["battle_id"], name: "index_battle_histories_on_battle_id"
  end

  create_table "battles", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "title", null: false
    t.datetime "apply_start_date", null: false
    t.datetime "apply_end_date", null: false
    t.datetime "battle_start_date", null: false
    t.datetime "battle_end_date", null: false
    t.integer "reword", null: false
    t.text "detail", null: false
    t.integer "achievement_rate", null: false
    t.integer "total_hp", null: false
    t.bigint "host_user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["host_user_id"], name: "index_battles_on_host_user_id"
  end

  create_table "participaints", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "battle_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["battle_id"], name: "index_participaints_on_battle_id"
    t.index ["user_id"], name: "index_participaints_on_user_id"
  end

  create_table "progresses", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "battle_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["battle_id"], name: "index_progresses_on_battle_id"
    t.index ["user_id"], name: "index_progresses_on_user_id"
  end

  create_table "providers", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "auth_protocol", default: "oauth2"
    t.string "provider"
    t.string "provider_account_id"
    t.string "access_token"
    t.string "token_type", default: "Bearer"
    t.string "scope"
    t.string "refresh_token"
    t.datetime "expires_at"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_providers_on_user_id"
  end

  create_table "stamps", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "image_url"
    t.boolean "obtained", default: false, null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_stamps_on_user_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "image_url"
    t.text "profile"
    t.boolean "deleted", default: false, null: false
    t.integer "reword_total", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "battle_favorites", "battles"
  add_foreign_key "battle_favorites", "users"
  add_foreign_key "battle_histories", "battles"
  add_foreign_key "battles", "users", column: "host_user_id"
  add_foreign_key "participaints", "battles"
  add_foreign_key "participaints", "users"
  add_foreign_key "progresses", "battles"
  add_foreign_key "progresses", "users"
  add_foreign_key "providers", "users"
  add_foreign_key "stamps", "users"
end
