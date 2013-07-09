Notes::Application.routes.draw do
  devise_for :users 
  resources :users, only: [:index]
  resources :notes do
    resources :shares, only: [:create, :destroy]
  end

  root to: 'notes#index'
end