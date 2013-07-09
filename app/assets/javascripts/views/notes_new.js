Notes.Views.NotesNew = Backbone.View.extend({
  events: {
    'click #submit_button': 'submit'
  },

  render: function() {
    var that = this;
    var renderedContent = JST['notes/new']({
      post: "that.model"
    });

    that.$el.html(renderedContent);
    return that;
  },

  submit: function(event) {
    event.preventDefault();
    var that = this;
   
    var attrs = $('form').serializeJSON();

    that.collection.create(attrs,
      {wait: true,
        success: function(model) {
        that.render();
      },
      error: function() {
        console.log("here");
        var $p = $('<p>').text("Note Not Saved");
        $('h2').append($p);
      }
    });
  }
})