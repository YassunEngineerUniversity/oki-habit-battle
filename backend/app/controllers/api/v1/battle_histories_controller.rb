class Api::V1::BattleHistoriesController < ApplicationController
  before_action :authenticate_user!

  def index
    page = params[:page] || 0
    per_page = params[:per_page] || 20

    category_params = params[:category]
    level_params = params[:level]
    order_params = params[:order] || "desc"

    @battles = Battle.joins(:battle_history, :categories, :battle_participants)
                                  .preload(:battle_history, :categories, :battle_participants)
                                  .where(battle_participants: { user_id: current_user.id }, battle_histories: { status: Status::COMPLETE })
                                  .page(page)
                                  .per(per_page)
    
    # カテゴリーが指定されている場合
    @battles = @battles.where(categories: { query: category_params }).distinct if category_params.present?

    # レベルが指定されている場合
    @battles = @battles.where(level: level_params).distinct if level_params.present?

    # ソート順が指定されている場合
    @battles = @battles.order(created_at: order_params).distinct if order_params.present? && order_params.in?(%w(asc desc))
  end
end
