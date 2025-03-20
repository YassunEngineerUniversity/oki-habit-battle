class Api::V1::BattleFavoritesController < ApplicationController
  before_action :authenticate_user!

  def index 
    page = params[:page] || 0
    per_page = params[:per_page] || 10

    @battles = current_user.favorite_battles.page(page).per(per_page)
  end
end
