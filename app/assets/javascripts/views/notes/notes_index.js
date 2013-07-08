Notes.Views.NotesIndex = Backbone.View.extend({
  template: JST['notes/index'],

  events: {
    "click .delete": "deleteNote",
    "keyup #search_box": "search"
  },

  initialize: function(){
    var that = this;

    that.listenTo(that.collection, 'destroy', that.render)
    that.listenTo(that.collection, 'add', that.render)
    that.listenTo(that.collection, 'change', that.render)

  },

  render: function(){
    var that = this;
    var allNotes = new Notes.Views.AllNotes({ collection: that.collection })
    window.Notes.Store.allNotes = allNotes;

    var renderedContent = that.template({
      notes: that.collection
    });

    that.$el.html(renderedContent)
    that.$el.append("<div id='all_notes'>"+allNotes.render(that.collection).$el.html()+"</div>");
    return that;
  },

  deleteNote: function(event){
    var that = this;
    var noteId = $(event.target).data('id');
    var model = that.collection.find(function(note){
      return note.get('id') === parseInt(noteId)
    });

    model.destroy();
  },

  search: function(event){
    var that = this;

    var searchQuery = $(event.target).val();
    if (searchQuery){
      that.collection.fetch({
        url: '/notes',
        dataType: 'json',
        data: {search: searchQuery},
        success: function(data){
          if (data.length !== 0){
            $('div#all_notes').empty();
            $('div#all_notes').html(window.Notes.Store.allNotes.render(data).$el.html());
            $('input#search_box').val(searchQuery);
            setTimeout(function(){
              $('input#search_box').focus();
            },5)
          }
        }
      })
    }
    
  }

});
