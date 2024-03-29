
/**
 * Module dependencies.
 */

var express = require('express')
  , config = require('./data/config')
  , util = require('util'),
    exec = require('child_process').exec;

var app = express();

// all environments
app.set('port', process.env.PORT || 3030);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);


function restartClients(cb) {
  var restart_file = './extra/start_all.exp';
  exec(restart_file, // command line argument directly in string
    function (error, stdout, stderr) {      // one easy function to capture data/errors
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
      if (cb) cb();
  });
}

var io = require('socket.io').listen(app.get('port'));
io.set('log level', 1);

var controller = require('./controller')(config, io);

// // development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }


io.sockets.on('connection', function (socket) {

  socket.emit('message', { message: 'hello from the backend'});
  controller.sync();
  socket.on('send', function (data) {
    console.log(data);
  });

  socket.on('controller', function(data) {
    if (data.action === 'update') {
      controller.sync();
    } else if (data.action === 'queue_user') {
      controller.queueUser(data.user);
      controller.sync();
    } else if (data.action === 'remove') {
      controller.removeUser(data.user);
      controller.sync();
    } else if (data.action === 'trigger') {
      controller.trigger(data.user);
      controller.sync();
    } else if (data.action === 'build_db') {
      console.log('building db');
      controller.buildDb();
    } else if (data.action === 'restart') {
      console.log('RESTARTING SERVER');
      restartClients(function() {process.exit(1);});
    } else if (data.action === 'test_algo') {
      console.log('testing secret algorithm');
      controller.testAlgo();
    } 
  });

});


