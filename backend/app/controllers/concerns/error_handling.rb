module ErrorHandling
  private

  def render_400(messages = [])
    render json: { errors: messages.presence || ["400 Bad Request"] }, status: :bad_request
  end

  def render_401(messages = [])
    render json: { errors: messages.presence || ["401 Unauthorized"] }, status: :unauthorized
  end

  def render_403(messages = [])
    render json: { errors: messages.presence || ["403 Forbidden"] }, status: :forbidden
  end

  def render_404(messages = [])
    render json: { errors: messages.presence || ["404 Not Found"] }, status: :not_found
  end
end