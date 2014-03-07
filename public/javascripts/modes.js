var DebugMode = function() {
  var module = {};
  module.init = function() {
    if (module.tweets) {
      var tweetText = "";
      console.log(module.tweets);
      for(var i = 0; i < module.tweets.length; i++) {
        tweetText += '<div class="tweet">' + module.tweets[i].text + '</div>';
      }
      $('body').append('<div class="debug" id="info">'+screenId+':'+module.user+'</div>');
      $('body').append('<div class="debug">'+tweetText+'</div>');
      $('body').append('<div class="debug" id="media"></div>');
    }
  }
  module.next = function() {
    var ind = module.files.length-1;
    if (ind >= 0) {
      if (module.files[ind].indexOf('.mp4') !== -1) { // append vine
        $('#media').append('<object data="'+module.files[ind]+'" />');
      } else { // append image
        $('#media').append('<img src="'+module.files[ind]+'" />');
      }
    }
  }
  module.exit = function() {}
  return module;
};

// the entrance is pulsing white to black on the centermost two screens
// everything else is black
var EnterMode = function() {
  var module = {};
  var timeline = {};
  module.init = function() {
    // the browser can barely handle this at 60fps, maybe should be webgl
    if(screenId == 0) {
      $('body').append('<div class="fullscreen whitebg" id="color"></div>');
      timeline = new TimelineMax();
      timeline
        .set("#color", {opacity:1})
        .to("#color", 3, {opacity:0, ease:Power2.easeIn})
        .repeat(-1);
    } else {
      $('body').append('<div class="fullscreen blackbg" id="color"></div>');
    }
  }
  module.next = function() {}
  module.exit = function() {}
  return module;
};

// one scene involves flashing single words briefly in the center
// with the font randomly selected, and mosaic images in the background
var CenteredTextMode = function() {
  var module = {};
  module.init = function() {
    $('body').append('<div class="centeredText"><span id="centeredWord">phantom</span></div>');
  }
  module.next = function() {}
  module.exit = function() {}
  module.update = function() {
    var words = [
      "Charley",
      "consummate",
      "convexity",
      "forche",
      "glitteringly",
      "hawser",
      "indicable",
      "musteline",
      "oinomancy",
      "pail",
      "spirt",
      "synclinorium",
      "tolusafranine",
      "uncope",
      "vexatory",
      "warsle"
    ];
    var fonts = [
      "Lato",
      "Arvo",
      "Playfair Display",
      "BenchNine",
      "Lora",
      "Bitter",
      "Kreon",
      "Crete Round",
      "Droid Serif",
      "Oswald",
      "Open Sans Condensed",
      "Montserrat",
      "Raleway",
      "Roboto+Slab",
      "Inconsolata",
      "Signika",
      "Old Standard TT"
    ];
    $('#centeredWord').text(randomChoice(words));
    $('#centeredWord').css({
      fontFamily: randomChoice(fonts),
      backgroundColor: '#fff',
      color: '#000'
    });
  }
  return module;
};

// the break should be quick pulsing of the whole space
// ideally in sync, or starting out of sync and coming into sync
var BreakMode = function() {
  var module = {};
  var timeline = {};
  module.init = function() {
    $('body').append('<div class="fullscreen whitebg" id="color"></div>');
    timeline = new TimelineMax();
    timeline
      .set("#color", {opacity:1})
      .to("#color", .5, {opacity:0, ease:Power2.easeIn})
      .repeat(-1);
  }
  module.next = function() {},
  module.exit = function() {}
  return module;
};

// exit is just white on all screens
var ExitMode = function() {
  var module = {};
  module.init = function() {
      $('body').append('<div class="fullscreen whitebg"></div>');
    },
  module.next = function() {}
  module.exit = function() {}
  return module;
};
