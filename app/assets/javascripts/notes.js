window.Notes = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},
  initialize: function($leftPane, $rightPane) {
    var that = this;

    var notes = new Notes.Collections.Notes;

    notes.fetch({
      success: function(){
        that.installLeftPane($leftPane, notes);
        new Notes.Routers.Notes($leftPane, $rightPane, notes)
        Backbone.history.start();
      },
    })
  },

  installLeftPane: function($leftPane, notes){
    var that = this;

    var notesIndex = new Notes.Views.NotesIndex({
      collection: notes
    });

    $leftPane.html(notesIndex.render().$el);
  }
};

