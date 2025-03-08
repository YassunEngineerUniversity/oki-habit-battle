class Api::V1::UsersController < ApplicationController
  def index
    users = User.all
    render json: users
  end

  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      render :create
    else
      render_400(user.errors.full_messages)
    end
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :password)
    end
end
