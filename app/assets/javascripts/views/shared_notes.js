Notes.Views.SharedNotes = Backbone.View.extend({
  template: JST['notes/shared'],

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

  },

  render: function(){
    var that = this;

    var renderedContent = that.template({
      notes: that.collection
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
      console.log(event.toElement)

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

})