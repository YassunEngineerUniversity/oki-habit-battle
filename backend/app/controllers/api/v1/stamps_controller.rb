class Api::V1::StampsController < ApplicationController
  before_action :authenticate_user!

  def index
    @stamps = current_user.stamps.obtained
  end
end
