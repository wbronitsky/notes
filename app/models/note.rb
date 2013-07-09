class Note < ActiveRecord::Base
  attr_accessible :body, :creator_id, :title

  belongs_to :creator, class_name: "User", foreign_key: :creator_id

  validates :title, :body, presence: true
end
