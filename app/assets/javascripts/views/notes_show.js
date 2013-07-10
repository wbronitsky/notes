Notes.Views.NotesShow = Backbone.View.extend({
  template: JST['notes/show'],

  events: {
    "dblclick .note_title": "editTitle",
    "dblclick .note_body": "editBody",
    "blur .title_input": "saveTitle",
    "blur .body_input": "saveBody",
    "click #go_away": "close",
    "focus input#email": "populateInput",
    "click input#share": "createShare",
  },

  initialize: function() {
    var that = this;

    that.listenTo(that.model, "destroy", function(){
      Backbone.history.navigate('#', {trigger: true});
    });
    that.listenTo(that.model, "change", that.render);

    var peer = new Peer({key: '8x1tv0bso1jrlik9'});
    var currentId = this.model.get('creator_id');
    
    

    this.listenTo(that.model, 'change', function(){
      var conn = peer.connect(currentId);
      var callback = conn.on('open', function(){
        conn.send('hello world!');
      });
    });
    
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
    }
  });
    var $shareButtons = $showPage.find('.shareButton');
    $shareButtons.draggable({revert:true});

    return that;
  },

  editTitle: function() {
    var title = $('h2.note_title').text();
    $('h2.note_title').empty();
    $('h2.note_title').html("<input class='title_input' value='" + title +  "'>");
  },

  editBody: function() {
    var body = $('p.note_body').text();
    $('p.note_body').empty();
    $('p.note_body').html("<textarea class='body_input'>" + body + "</textarea>");
  },

  saveTitle: function() {
    var that = this;

    var newTitle = $('input.title_input').val();

    var $h2 = $('h2.note_title');
    $h2.empty();
    $h2.text(newTitle);

    that.model.save({ note: {title: newTitle }});
  },

  saveBody: function() {
    var that = this;

    var newBody = $('textarea.body_input').val();

    $('p.note_body').empty();
    $('p.note_body').text(newBody);

    that.model.set({ note: {body: newBody }});
    that.model.save();
  },

  close: function(){
    Backbone.history.navigate('#', {trigger: true});
  },

  populateInput: function(event){
    $.ajax({
      url: '/users',
      success: function(data){
        var emails = _(data).map(function(user){
          return user.email
        });
        $(event.target).typeahead({source: emails});
      }
    })
  },

  createShare: function(event){
    event.preventDefault();
    var formData = $('form#shareForm').serializeJSON();
    $('input#email').val("");
    $.ajax({
      url: 'notes/'+$(event.target).data('id')+'/shares',
      type: 'POST',
      data: formData,
      success: function(data){
        $newShareButton = $("<div class='btn btn-small shareButton' data-shareId='"+data.note_id+"' data-id='"+data.id+"'>"+ data.user_email +"</div>")
        $('div#sharesDiv').append($newShareButton);
        $newShareButton.draggable({revert:true});
      }
    })
  }
})