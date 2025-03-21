class Api::V1::BattleProgressesController < ApplicationController
  before_action :authenticate_user!

  def create
    battle = Battle.find_by(id: params[:battle_id])
    return render_404("バトルが見つかりません") unless battle

    new_battle_progress = BattleProgress.new(user: current_user, battle: battle)
    return render_422("バトル進捗の作成に失敗しました") unless new_battle_progress.save
  end
end
