Notes::Application.routes.draw do
  devise_for :users 
  resources :users, only: [:index]
  resources :notes do
    collection do
      get 'shared'
    end
    resources :shares, only: [:create, :destroy]
  end

  put '/notes/shared/:id', to: 'notes#update'
  devise_scope :user do
    get '/logout', to: 'devise/sessions#destroy'
  end
  root to: 'notes#index'
end