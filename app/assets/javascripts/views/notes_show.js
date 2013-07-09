Notes.Views.NotesShow = Backbone.View.extend({
  template: JST['notes/show'],

  events: {
    "dblclick .title": "editTitle",
    "dblclick .body": "editBody",
    "blur .title_input": "saveTitle",
    "blur .body_input": "saveBody",
    "click #go_away": "close"

  },

  initialize: function() {
    var that = this;

    that.listenTo(that.model, "destroy", function(){
      Backbone.history.navigate('#', {trigger: true});
    });
    that.listenTo(that.model, "change", that.render)
  },

  render: function() {
    var that = this;

    var renderedContent = JST['notes/show']({
      note: that.model
    });

    this.$el.html(renderedContent);

    var $showPage = $(this.$el.find('#show_page')[0]);
    $showPage.droppable({accept: 'li.all_notes', drop: function(event){
      console.log($(event.toElement).data('body'));
      var draggedBody = $(event.toElement).data('body');
      var droppedBody = that.model.escape('body');
      var newBody = droppedBody + "\n" + draggedBody;

      that.model.save({body: newBody});
    }});
    return that;
  },

  editTitle: function() {
    var title = $('h2').text();
    $('h2').empty();
    $('h2').html("<input class='title_input' value='" + title +  "'>");
  },

  editBody: function() {
    var body = $('p').text();
    $('p').empty();
    $('p').html("<textarea class='body_input'>" + body + "</textarea>");
  },

  saveTitle: function() {
    var that = this;

    var newTitle = $('input.title_input').val();

    var $h2 = $('h2');
    $h2.empty();
    $h2.text(newTitle);

    that.model.save({ note: {title: newTitle }});
  },

  saveBody: function() {
    var that = this;

    var newBody = $('textarea.body_input').val();

    $('p').empty();
    $('p').text(newBody);

    that.model.set({ note: {body: newBody }});
    that.model.save();
  },

  close: function(){
    Backbone.history.navigate('#', {trigger: true});
  }
})