class AddEmailToShare < ActiveRecord::Migration
  def change
    add_column :shares, :user_email, :string
  end
end
