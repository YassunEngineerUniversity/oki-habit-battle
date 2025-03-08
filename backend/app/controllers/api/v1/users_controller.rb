class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!, only: [:me, :update, :destroy]
  def create
    user = User.new(user_params)
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

  end

  def destroy
    current_user.update(deleted_at: Time.now)
    session[:user_id] = nil
    render :destroy
    
    # Todo: 一定期間経つと削除する処理を追加
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :password)
    end
end
