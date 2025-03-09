# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  deleted_at      :datetime
#  email           :string(255)      not null
#  name            :string(255)      not null
#  password_digest :string(255)      not null
#  profile         :text(65535)
#  reword_total    :integer          default(0), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'rails_helper'

RSpec.describe User, type: :model do
  let!(:saved_user) { FactoryBot.create(:user) }

  shared_examples "Error Case" do | error_target, error_message |
    let(:invalid_user) { FactoryBot.build(:user) }
    it "バリデーションエラーが発生する" do
      subject
      invalid_user.save
      expect(invalid_user).not_to be_valid
      expect(invalid_user.errors[error_target]).to include(error_message)
    end
  end

  shared_examples "Error Case For Password" do | target, error_target, error_message |
    let(:invalid_user) { FactoryBot.build(:user, target) }
    it "バリデーションエラーが発生する" do
      invalid_user.save
      expect(invalid_user).not_to be_valid
      expect(invalid_user.errors[error_target]).to include(error_message)
    end
  end

  context "正常な場合" do
    let(:valid_user) { FactoryBot.build(:user) }
    it "バリデーションエラーが発生しない" do
      valid_user.save
      expect(valid_user).to be_valid

      # DBにレコードが追加されているか確認
      saved_valid_user = User.find_by(email: valid_user.email)
      expect(saved_valid_user).to be_present
    end
  end

  context "メールアドレスが重複している場合" do
    subject { invalid_user.email = saved_user.email }
    include_examples "Error Case", :email, "has already been taken"
  end

  context "名前が空の場合" do
    subject { invalid_user.name = "" }
    include_examples "Error Case", :name, "can't be blank"
  end

  context "メールアドレスが空の場合" do
    subject { invalid_user.email = "" }
    include_examples "Error Case",  :email, "can't be blank"
  end

  context "パスワードが空の場合" do
    include_examples "Error Case For Password", { password: "" }, :password, "can't be blank"
  end

  context "名前が255字以上の場合" do
    subject { invalid_user.name = Faker::Lorem.characters(number: 256) }
    include_examples "Error Case", :name, "is too long (maximum is 255 characters)"
  end

  context "パスワードが72字以上の場合" do
    include_examples "Error Case For Password", { password: Faker::Lorem.characters(number: 73) }, :password, "is too long"
  end
end
