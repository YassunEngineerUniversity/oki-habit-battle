require "sidekiq/web"

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  # Mount the Sidekiq web UI at /sidekiq
  mount Sidekiq::Web => "/sidekiq"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get "/home", to: "homes#index"
      post "/login", to: "sessions#create"
      delete "/logout", to: "sessions#destroy"
      get "/me", to: "users#me"
      put "/me", to: "users#update"
      delete "/me", to: "users#destroy"
      get "/battle-categories", to: "categories#index"
      post "/battle-progress", to: "battle_progresses#create"
      get "/history-summary", to: "history_summaries#show"
      resources :users, only: [ :create ]
      resources :battles, only: [ :index, :show, :create, :update, :destroy ] do
        post "/participants", to: "battle_participants#create"
        delete "/participants", to: "battle_participants#destroy"

        collection do
          get "/favorites", to: "battle_favorites#index"
          get "/histories/me", to: "battle_histories#index"
        end

        post "/favorites", to: "battle_favorites#create"
        delete "/favorites", to: "battle_favorites#destroy"
      end
      resources :active_battles, only: [ :show ], path: "active-battles"
      resources :stamps, only: [ :index ] do
        collection do
          get "/me", to: "stamps#index"
          put "/today", to: "stamps#update"
        end
      end
    end
  end
end
