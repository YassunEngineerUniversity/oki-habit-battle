class Api::V1::BattlesController < ApplicationController
  before_action :authenticate_user!

  # 使用想定画面: 対戦検索画面
  def index
    page = params[:page] || 0  # 現在のページ
    per_page = params[:per_page] || 10 # 表示件数

    # パラメータの取得
    status_params = params[:status] || "waiting"
    category_params = params[:category]
    level_params = params[:level]
    order_params = params[:order]
    query_params = params[:q]

     # 条件 : 自分がhostではない、かつ、自分が参加していない、かつ、バトルのステータスがwaitingのもののみ取得
    paticipainted_battle_ids = BattleParticipant.where(user_id: current_user.id).pluck(:battle_id)
    @battles = Battle.joins(:battle_history, :categories)
                    .includes(:battle_history)
                    .where.not(id: paticipainted_battle_ids)
                    .where(battle_histories: { status: status_params })
                    .page(page)
                    .per(per_page)

    # カテゴリーが指定されている場合
    @battles = @battles.where(categories: { name: category_params }).distinct if category_params.present?

    # レベルが指定されている場合
    @battles = @battles.where(level: level_params).distinct if level_params.present?
   
    # ソート順が指定されている場合
    @battles = @battles.order(created_at: order_params).distinct if order_params.present? && order_params.in?(%w(asc desc))

    # 検索ワードが指定されている場合
    @battles = @battles.where("title LIKE :query OR detail LIKE :query", query: "%#{query_params}%").distinct if query_params.present?

  end

  # 使用想定画面: 対戦詳細画面
  def show
    @battle = Battle.find_by(id: params[:id])

    return render_404("バトルが見つかりません") unless @battle
  end

  def create

  end

  def update

  end

  def destroy

  end
end
