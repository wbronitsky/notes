Notes.Views.NotesIndex = Backbone.View.extend({
  template: JST['notes/index'],

  events: {
    "keyup #search_box": "search"
  },

  initialize: function(){
    var that = this;
    var callback = function(){
      that.collection.fetch({
        success: function(){
          that.render();
        }
      })
    }

    that.listenTo(that.collection, 'destroy', callback)
    that.listenTo(that.collection, 'add', that.render)
    that.listenTo(that.collection, 'change', that.render)

  },

  render: function(){
    var that = this;

    var renderedContent = that.template({
      notes: that.collection
    });

    that.$el.html(renderedContent);
    
    var $trash = $(that.$el.find('div#trash'));

    $trash.droppable({accept: '.shareButton, .all_notes', drop: function(event){
      console.log(event.toElement)
      if ($(event.toElement).hasClass('shareButton')){
        var $shareButton = $(event.toElement);
        var shareId = $shareButton.data('id');
        var noteId = $shareButton.data('noteId');
        
        $.ajax({
          url: 'notes/'+noteId+'/shares/'+shareId,
          type: 'DELETE',
          success: function(data){
            $shareButton.remove();
          }
        })
      } else {
        console.log(event.toElement);
        var noteId = $(event.toElement).data('id');
        console.log(noteId);
        var model = that.collection.get(parseInt(noteId));
        console.log(model);

        model.destroy();
      }
      
    }});
    return that;
  },

  search: function(event){
    var that = this;

    var searchQuery = $(event.target).val();
    that.collection.fetch({
      dataType: 'json',
      data: {search: searchQuery},
      success: function(){
        that.render();
        $('input#search_box').val(searchQuery);
        $('input#search_box').focus();
      }
    })
  }

});
