class Api::V1::StampsController < ApplicationController
  before_action :authenticate_user!

  def index
    @stamps = currnet_user.stamps
  end
end
