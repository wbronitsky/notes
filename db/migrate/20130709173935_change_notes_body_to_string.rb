class ChangeNotesBodyToString < ActiveRecord::Migration
  def up
    change_column :notes, :body, :string
  end

  def down
  end
end
