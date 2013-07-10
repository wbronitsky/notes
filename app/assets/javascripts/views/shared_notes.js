Notes.Views.SharedNotes = Backbone.View.extend({
  template: JST['notes/shared'],

  events: {
    "keyup #shared_search_box": "search"
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

    var myId = $('#currentUser').data('id');
    var peer = new Peer(''+myId, {key: '8x1tv0bso1jrlik9'});

    peer.on('connection', function(conn){
      conn.on('data', function(data){
        that.collection.fetch({
          success: function(){
            that.render();
          }
        });
      });
    });

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

    var $tab = $($('body').find('.tab2'));
    $tab.on('click', function(){
      that.collection.fetch({
        success: function(){
          that.render();
        }
      })
    })
    
    var $trash = $(that.$el.find('div#trash'));

    $trash.droppable({accept: '.shareButton', drop: function(event){

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
    }});
    return that;
  },

  search: function(event){
    var that = this;

    var searchQuery = $(event.target).val();
    var searchResults = that.collection.search(searchQuery);
    
    if (searchQuery == ""){
      that.render()
    } else {
      that.render(searchResults);
    };

    $('input#shared_search_box').val(searchQuery);
    $('input#shared_search_box').focus();
    
  }
})