class Api::V1::SessionsController < ApplicationController
  def create
    @user = User.find_by(email: params[:email])

    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id # セッションにユーザIDを保存
      render json: { message: "ログインに成功しました。" }, status: :ok
    else
      render_422("無効なメールアドレスかパスワードです。")
    end
  end

  def destroy
    if current_user.nil?
      render_401("ログインしていません。")
      return
    end

    reset_session
    cookies.delete(:_habitbattle_session)
    render json: { message: "ログアウトに成功しました。" }, status: :ok
  end
end
