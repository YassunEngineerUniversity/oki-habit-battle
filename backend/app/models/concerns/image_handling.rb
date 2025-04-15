module ImageHandling
  extend ActiveSupport::Concern

  included do
    class_attribute :image_attachment_name, instance_writer: false, default: :image

    validate :check_content_type
    validate :check_image_size
  end
  
  def image_url
    Rails.application.routes.url_helpers.url_for(send(self.class.image_attachment_name)) if send(self.class.image_attachment_name).attached?
  end

  private
    def current_image_attachment
      send(self.class.image_attachment_name)
    end
    
    def check_content_type
      attachment = current_image_attachment
      if attachment.attached? && !attachment.content_type.in?(%w[image/jpeg image/png image/webp image/jpg])
        errors.add(self.class.image_attachment_name, "is not one of JPEG, PNG, or WEBP")
      end
    end

    def check_image_size
      attachment = current_image_attachment
      if attachment.attached? && attachment.blob.byte_size > 2.megabytes
        errors.add(self.class.image_attachment_name, "upload a file that is 2MB or less")
      end
    end
end