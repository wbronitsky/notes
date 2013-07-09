window.Notes = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},
  initialize: function($leftPane, $rightPane) {
    var that = this;

    var notes = new Notes.Collections.Notes;
    var sharedNotes = new Notes.Collections.SharedNotes

    notes.fetch({
      success: function(){
        sharedNotes.fetch({
          success: function(){
            that.installLeftPane($leftPane, notes, sharedNotes);
            new Notes.Routers.Notes($leftPane, $rightPane, notes, sharedNotes);
            Backbone.history.start();
          }
        }) 
      },
    })
  },

  installLeftPane: function($leftPane, notes, sharedNotes){
    var that = this;

    var notesIndex = new Notes.Views.NotesIndex({
      collection: notes
    });

    var sharedNotes = new Notes.Views.SharedNotes({
      collection: sharedNotes
    });

    $($leftPane.find('#tabs-1')).html(notesIndex.render().$el);
    $($leftPane.find('#tabs-2')).html(sharedNotes.render().$el);
  }
};

