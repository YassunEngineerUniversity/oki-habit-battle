class ApplicationController < ActionController::API
  include ActionController::Cookies

  private

  def authenticate_user!
    unless session[:user_id]
      render json: { error: "認証されていないアクセスです。" }, status: :unauthorized
    end
  end

  def current_user
    if (user_id = session[:user_id]) # 代入と評価を同時にやっている
      user = User.find_by(id: user_id)
      @current_user ||= User.find_by(id: user_id)
    end
  end
end
