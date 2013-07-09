class Note < ActiveRecord::Base
  attr_accessible :body, :creator_id, :title

  belongs_to :creator, class_name: "User", foreign_key: :creator_id
  has_many :shares
  has_many :users_shared_with, through: :shares, source: :user

  validates :title, :body, presence: true

  def as_json(options = {})
    super(options.merge(include: [:shares]))
  end
end
