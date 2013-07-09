class NotesController < ApplicationController
  def index
    if params[:search] 
      @notes = Note.basic_search(params[:search])
                   .where(creator_id: current_user.id)
                   .order('created_at DESC')
                   .limit(10)
      @notes = current_user.notes.order('created_at DESC').limit(10) if params[:search] == ""
    else
      @notes = current_user.notes.order('created_at DESC').limit(10) if current_user
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

  def shared
    if params[:search] 
      @notes = current_user.notes_shared_with
                           .basic_search(params[:search])
                           .order('created_at DESC')
                           .limit(10)
      @notes = current_user.notes_shared_with.order('created_at DESC').limit(10) if params[:search] == ""
    else
      @notes = current_user.notes_shared_with
                           .order('created_at DESC')
                           .limit(10)
    end

    render json: @notes
  end
end
