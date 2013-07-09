Notes.Views.AllNotes = Backbone.View.extend({
  template: JST['notes/all'],

  render: function(data){
    var that = this;

    var renderedContent = that.template({
      notes: that.collection
    });

    that.$el.html(renderedContent);
    return that;
  }
})