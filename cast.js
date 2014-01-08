Items = new Meteor.Collection('items');
Items.insert({ name : 'ben' });
Items.insert({ name : 'kit' });

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to cast.";
  };

  var renderTemplate = function(obj){
    return '<p>' + obj.name + '</p>';
  };

  Template.hello.rendered = function(){
    var el = this.find('#cast');
    var mycast = cast(el);
    mycast.draw(renderTemplate);

    this.handle = Meteor.autorun(function(){
      var items = Items.find().fetch();
      mycast
        .data(items, '_id')
        .dynamic(150, 150, 10, 10);
    });
  }

  Template.hello.events({
    'click input' : function () {
      Items.insert({ name : 'another' });
    }
  });


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
