class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.integer :creator_id
      t.integer :title
      t.integer :body

      t.timestamps
    end
  end
end
