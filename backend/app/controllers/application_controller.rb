class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ErrorHandling

  def authenticate_user!
    return render_401("認証されていないアクセスです。") unless session[:user_id]
  end

  def current_user
    if (user_id = session[:user_id]) # 代入と評価を同時にやっている
      user = User.find_by(id: user_id)
      @current_user ||= User.find_by(id: user_id)
    end
  end
end
