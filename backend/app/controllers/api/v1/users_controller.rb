class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!, only: [:me, :update, :destroy]

  def create
    user = User.new(create_user_params)
    if user.save
      session[:user_id] = user.id
      render :create
    else
      render_400(user.errors.full_messages)
    end
  end

  # 使用想定画面: プロフィール画面、プロフィール更新画面
  def me
    @current_user = current_user
    if @current_user
      render :me
    else
      render_404("ユーザが見つかりませんでした")
    end
  end

  def update
    if current_user.update(update_user_params)
      render :update
    else
      render_400(current_user.errors.full_messages)
    end
  end

  def destroy
    if current_user.update_column(:deleted_at, Time.zone.now)
      reset_session
      cookies.delete(:_habitbattle_session)
      render :destroy
    else
      render_422("退会処理中にエラーが発生しました")
    end

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
