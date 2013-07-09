class NotesController < ApplicationController
  def index
    if params[:search] && params[:search] != "all" 
      @notes = Note.basic_search(params[:search]).where(creator_id: current_user.id)
      @notes = current_user.notes if params[:search] == ""
    else
      @notes = current_user.notes
    end

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
end
