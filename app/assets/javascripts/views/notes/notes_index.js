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
    };

    that.listenTo(that.collection, 'destroy', callback);
    that.listenTo(that.collection, 'add', that.render);
    that.listenTo(that.collection, 'change', that.render);

    if (this.collection.first()){
      var currentId = this.collection.first().get('creator_id');
      
      var peer = new Peer(currentId, {key: '8x1tv0bso1jrlik9'});

      peer.on('connection', function(conn){
        conn.on('data', function(data){
          console.log('Got data:', data);
          that.collection.fetch({
            success: function(){
              that.render();
            }
          });
        });
      });
    };
    
    
  },

  render: function(searchResults){
    var that = this;
    
    if (searchResults){
      if (searchResults.collection){
        var data = searchResults.collection
      } else {
        var data = searchResults
      }   
    }  else {
      var data = that.collection
    };

    var renderedContent = that.template({
      notes: data
    });

    that.$el.html(renderedContent);
    
    var $trash = $(that.$el.find('div#trash'));

    $trash.droppable({accept: '.shareButton, .all_notes', drop: function(event){
      
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
        var noteId = $(event.toElement).data('id');
        var model = that.collection.get(parseInt(noteId));

        model.destroy();
      }
      
    }});
    return that;
  },

  search: function(event){
    var that = this;

    var searchQuery = $(event.target).val();
    var results = that.collection.search(searchQuery);
    
    if (searchQuery == ""){
      that.render()
    } else {
      that.render(results);
    };

    $('input#search_box').val(searchQuery);
    $('input#search_box').focus();
    
  }

});
