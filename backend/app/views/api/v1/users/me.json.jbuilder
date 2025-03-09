json.extract! @current_user, :id, :name, :email, :profile, :reword_total, :created_at, :updated_at
json.image_url @current_user.image_url