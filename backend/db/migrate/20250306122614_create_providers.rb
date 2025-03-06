class CreateProviders < ActiveRecord::Migration[8.0]
  def change
    create_table :providers do |t|
      t.string :auth_protocol, default: "oauth2"
      t.string :provider
      t.string :provider_account_id
      t.string :access_token
      t.string :token_type, default: "Bearer"
      t.string :scope
      t.string :refresh_token
      t.datetime :expires_at

      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
