Notes.Routers.Notes = Backbone.Router.extend({
  initialize: function($nav, $rootEl, notes, sharedNotes){
    this.$nav = $nav
    this.$rootEl = $rootEl;
    this.notes = notes;
    this.sharedNotes = sharedNotes
  },

  routes: {
    "": "index",
    "notes/new": "new",
    "notes/:id": "show"
  },

  index: function(){
    var that = this;
    
    this.$rootEl.empty();
    var newNote = new Notes.Views.NotesNew({
      model: new Notes.Models.Note,
      collection: that.notes
    });
    this._swapView(newNote)
  },

  show: function(id){
    var that = this;

    var note = that.notes.findWhere({ id: parseInt(id) }) || that.sharedNotes.findWhere({ if: parseInt(id)});
    console.log(note);
    var noteShow = new Notes.Views.NotesShow({
      model: note
    });

    that._swapView(noteShow);
  },

  new: function(){
    var that = this;

    var newNote = new Notes.Views.NotesNew({
      model: new Notes.Models.Note,
      collection: that.notes
    });

    that._swapView(newNote);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

  _swapNavView: function (view) {
    this._currentNavView && this._currentView.remove();
    this._currentNavView = view;
    this.$nav.html(view.render().$el);
  }
});
