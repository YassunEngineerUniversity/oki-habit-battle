class Api::V1::StampsController < ApplicationController
  before_action :authenticate_user!

  def index
    @stamps = current_user.stamps.obtained
  end

  def update
    stamp = current_user.stamps.find_by(generated_date: Time.zone.today, obtained: false)
    return render_404("スタンプが見つかりません") unless stamp
    return render_400("スタンプは既に取得済みです") if stamp.obtained

    stamp.update(obtained: true)
  end
end
