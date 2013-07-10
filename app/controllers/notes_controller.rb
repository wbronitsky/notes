class NotesController < ApplicationController
  def index
    @notes = current_user.notes.order('created_at DESC') if current_user
    
    if current_user
      respond_to do |f|
        f.html {render 'index'}
        f.json {render json: @notes}
      end
    else
      redirect_to new_user_session_url
    end
  end

  def create
    note = current_user.notes.create!(params[:note])

    render json: note
  end

  def destroy
    note = Note.find(params[:id])
    note.destroy

    render json:note
  end

  def update
    note = Note.find(params[:id])
    note.update_attributes(params[:note])

    render json: note
  end

  def shared
    @notes = current_user.notes_shared_with.order('created_at DESC') if current_user

    render json: @notes
  end
end
