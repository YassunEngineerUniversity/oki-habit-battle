class Api::V1::SessionsController < ApplicationController
  def create
    @user = User.find_by(email: params[:email])

    return render_422("無効なメールアドレスかパスワードです。") unless @user && @user.authenticate(params[:password])
    
    session[:user_id] = @user.id # セッションにユーザIDを保存
  end

  def destroy
    return render_401("ログインしていません。") if current_user.nil?

    reset_session
    cookies.delete(:_habitbattle_session)
  end
end
