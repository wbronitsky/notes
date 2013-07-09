Notes::Application.routes.draw do
  devise_for :users 
  resources :users, only: [:index]
  resources :notes do
    collection do
      get 'shared'
    end
    resources :shares, only: [:create, :destroy]
  end

  get '/logout', to: 'devise/session#destroy'
  root to: 'notes#index'
end