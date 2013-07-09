class SharesController < ApplicationController
  def create
    note = Note.find(params[:note_id])
    user = User.find_by_email(params[:email])
    share = note.shares.create!(user_id: user.id, user_email: params[:email])

    render json: share
  end

  def destroy
    share = Share.find(params[:id])
    share.destroy

    render json: share
  end
end
