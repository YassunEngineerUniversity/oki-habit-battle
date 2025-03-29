# == Schema Information
#
# Table name: stamps
#
#  id             :bigint           not null, primary key
#  generated_date :date
#  obtained       :boolean          default(FALSE), not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  user_id        :bigint           not null
#
# Indexes
#
#  index_stamps_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe Stamp, type: :model do
  let!(:host_user) { FactoryBot.create(:user) }

  # 正常系
  context "モデルのバリデーションにかからない場合" do
    it "Stampテーブルにレコードが作成される" do
      stamp = Stamp.new(user_id: host_user.id, generated_date: Time.zone.today)
      stamp.save
      expect(stamp).to be_valid
      expect(Stamp.find_by(id: stamp.id)).to be_present
    end
  end

  context "正常に画像が保存される場合" do
    it "PNG画像がActive Storageに保存される" do
      stamp = Stamp.create(
        user_id: host_user.id,
        generated_date: Time.zone.today,
        image: fixture_file_upload(Rails.root.join('spec/fixtures/files/test_image.png'), 'image/png')
      )
      expect(stamp).to be_valid
      expect(Stamp.find_by(id: stamp.id)).to be_present
    end

    it "JPG画像がActive Storageに保存される" do
      stamp = Stamp.create(
        user_id: host_user.id,
        generated_date: Time.zone.today,
        image: fixture_file_upload(Rails.root.join('spec/fixtures/files/test_image.jpg'), 'image/jpg')
      )
      expect(stamp).to be_valid
      expect(Stamp.find_by(id: stamp.id)).to be_present
    end
    it "WEBP画像がActive Storageに保存される" do
      stamp = Stamp.create(
        user_id: host_user.id,
        generated_date: Time.zone.today,
        image: fixture_file_upload(Rails.root.join('spec/fixtures/files/test_image.webp'), 'image/webp')
      )
      expect(stamp).to be_valid
      expect(Stamp.find_by(id: stamp.id)).to be_present
    end
  end

  # 異常系
  # context "generated_dateがnilの場合" do
  #   it "バリデーションエラーが発生する" do
  #     stamp = Stamp.new(user_id: host_user.id, generated_date: nil)
  #     stamp.save
  #     expect(stamp.errors.messages[:generated_date]).to include("can't be blank")
  #   end
  # end

  context "一日に複数回スタンプを作成しようとした場合" do
    it "バリデーションエラーが発生する" do
      Stamp.create(user_id: host_user.id, generated_date: Time.zone.today)
      stamp = Stamp.new(user_id: host_user.id, generated_date: Time.zone.today)
      stamp.save
      expect(stamp).to_not be_valid
      expect(stamp.errors.messages[:user_id]).to include("has already been taken")
      expect(Stamp.find_by(id: stamp.id)).to_not be_present
    end
  end

  context "obtainedがnilの場合" do
    it "バリデーションエラーが発生する" do
      stamp = Stamp.new(user_id: host_user.id, generated_date: Time.zone.today, obtained: nil)
      stamp.save
      expect(stamp).to_not be_valid
      expect(stamp.errors.messages[:obtained]).to include("is not included in the list")
      expect(Stamp.find_by(id: stamp.id)).to_not be_present
    end
  end

  context "不正な画像形式の場合" do
    it "バリデーションエラーが発生する" do
      stamp = Stamp.create(
        user_id: host_user.id,
        generated_date: Time.zone.today,
        image: fixture_file_upload(Rails.root.join('spec/fixtures/files/test_image.txt'), 'text/plain')
      )
      expect(stamp).to_not be_valid
      expect(stamp.errors.messages[:image]).to include("is not one of JPEG, PNG, or WEBP")
      expect(Stamp.find_by(id: stamp.id)).to_not be_present
    end
  end

  context "不正な画像サイズの場合" do
    it "バリデーションエラーが発生する" do
      stamp = Stamp.create(
        user_id: host_user.id,
        generated_date: Time.zone.today,
        image: fixture_file_upload(Rails.root.join('spec/fixtures/files/3mb.jpg'), 'image/jpg')
      )
      expect(stamp).to_not be_valid
      expect(stamp.errors.messages[:image]).to include("upload a file that is 2MB or less")
      expect(Stamp.find_by(id: stamp.id)).to_not be_present
    end
  end
end
