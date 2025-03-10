class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!, only: [:me, :update, :destroy]

  def create
    user = User.new(create_user_params)
    return render_400(user.errors.full_messages) unless user.save

    session[:user_id] = user.id
    render :create
  end

  # 使用想定画面: プロフィール画面、プロフィール更新画面
  def me
    @current_user = current_user
  end

  def update
    render_400(current_user.errors.full_messages) unless current_user.update(update_user_params)
  end

  def destroy
    return render_422("退会処理中にエラーが発生しました") unless current_user.update_column(:deleted_at, Time.zone.now)

    reset_session
    cookies.delete(:_habitbattle_session)

    # Todo: 一定期間経つと削除する処理を追加
  end

  private
  def create_user_params
    params.require(:user).permit(:name, :email, :password)
  end

  def update_user_params
    params.require(:user).permit(:name, :image, :profile)
  end
end
