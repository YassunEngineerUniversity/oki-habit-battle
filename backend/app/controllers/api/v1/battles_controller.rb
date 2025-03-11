class Api::V1::BattlesController < ApplicationController
  before_action :authenticate_user!

  # 使用想定画面: 対戦検索画面
  def index
    page = params[:page] || 0  # 現在のページ
    per_page = params[:per_page] || 5 # 表示件数

    # パラメータの取得
    category_params = params[:category]

    paticipainted_battle_ids = BattleParticipant.where(user_id: current_user.id).pluck(:battle_id)
    @battles = Battle.joins(:battle_history)
                    .includes(:battle_history)
                    .where.not(id: paticipainted_battle_ids)
                    .where(battle_histories: { status: "waiting" })
                    .page(page)
                    .per(per_page)
    
    # カテゴリーが指定されている場合
    if category_params.present?
      @battles = @battles.where(: category_params)


    # 条件 : 自分がhostではない、かつ、自分が参加していない
    

  end

  def show

  end

  def create

  end

  def update

  end

  def destroy

  end
end
