class ChangeTypeForNotesColumns < ActiveRecord::Migration
  def up
    change_column :notes, :title, :string
    change_column :notes, :body, :text
  end

  def down
  end
end
