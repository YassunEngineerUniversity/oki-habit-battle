class Api::V1::SessionsController < ApplicationController
  def create
    @user = User.find_by(email: params[:email])

    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id # セッションにユーザIDを保存
      render json: { message: "ログインに成功しました。" }, status: :ok
    else
      render_401("無効なメールアドレスかパスワードです。")
    end
  end

  def destroy
    reset_session
    cookies.delete(:_habitbattle_session)
    @current_user = nil
    render :destroy
  end
end
