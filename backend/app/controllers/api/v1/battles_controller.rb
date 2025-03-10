class Api::V1::BattlesController < ApplicationController
  before_action :authenticate_user!

  # 使用想定画面: 対戦検索画面
  def index
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
