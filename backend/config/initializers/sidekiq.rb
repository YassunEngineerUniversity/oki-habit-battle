Sidekiq.configure_server do |config|
  config.redis = { url: 'redis://redis:6379' }
  config.logger = Sidekiq::Logger.new($stdout)
end

Sidekiq.configure_client do |config|
  config.redis = { url: 'redis://redis:6379' }
end