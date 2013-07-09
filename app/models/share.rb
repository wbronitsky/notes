class Share < ActiveRecord::Base
  attr_accessible :note_id, :user_id, :user_email

  belongs_to :user
  belongs_to :note 
end
