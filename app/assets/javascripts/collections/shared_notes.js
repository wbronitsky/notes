Notes.Collections.SharedNotes = Backbone.Collection.extend({
  url: 'notes/shared',
  model: Notes.Models.Note,
  search : function(letters){
    if(letters == "") return this;
 
    var pattern = new RegExp(letters,"gi");
    return _(this.filter(function(data) {
        return pattern.test(data.get("title")) || pattern.test(data.get("body"));
    }))}

});
