class Api::V1::BattleParticipantsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_battle

  def create
    return render_404("バトルが見つかりません") unless @battle

    battle_paticipant = BattleParticipant.find_by(battle_id: @battle.id, user_id: current_user.id)
    return render_400("すでに参加しているバトルです") if battle_paticipant

    BattleParticipant.create(battle_id: @battle.id, user_id: current_user.id)
  end

  def destroy
    return render_404("バトルが見つかりません") unless @battle
    return render_400("自分のバトルは退出できません") if @battle.host_user_id == current_user.id

    battle_paticipant = BattleParticipant.find_by(battle_id: @battle.id, user_id: current_user.id)
    return render_404("すでに退出済みです") unless battle_paticipant

    battle_paticipant.destroy
  end

  private
    def set_battle
      @battle = Battle.find_by(id: params[:battle_id])
    end
end
