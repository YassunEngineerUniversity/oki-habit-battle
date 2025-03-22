class Api::V1::BattleHistoriesController < ApplicationController
  before_action :authenticate_user!

  def index
    page = params[:page] || 0
    per_page = params[:per_page] || 10

    category_params = params[:category]
    level_params = params[:level]
    order_params = params[:order]

    @battles = current_user.battles.joins(:battle_history, :categories)
                                  .preload(:battle_history, :categories)
                                  .where(battle_histories: { status: "completed" })
                                  .page(page)
                                  .per(per_page)

    # カテゴリーが指定されている場合
    @battles = @battles.where(categories: { name: category_params }).distinct if category_params.present?

    # レベルが指定されている場合
    @battles = @battles.where(level: level_params).distinct if level_params.present?

    # ソート順が指定されている場合
    @battles = @battles.order(created_at: order_params).distinct if order_params.present? && order_params.in?(%w(asc desc))
  end
end
