var WelcomeMode = function() {

  console.log('load welcomemode ');

  var module = {};

  module.play = function() {
    console.log(module.tweets);
    $('#test').html(module.user);
  };

  module.exit = function() {
    $('#test').empty();
  }
  
  return module;
};