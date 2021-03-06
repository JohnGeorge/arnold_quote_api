require('dotenv').config({
  silent: true
});
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var router = require('./app/routes/index');
var socketIo = require('./app/routes/socketio');
var mongoose = require('mongoose');
var Promise = require('bluebird');
Promise.promisifyAll(mongoose);
var mode = process.env.NODE_ENV;

if (mode === 'development') {
  mongoose.connect(process.env.MONGO_TEST);
} else {
  mongoose.connect(process.env.MONGO_DB);
}

//Check for errors.
mongoose.connection.on('error', function(err) {
  if (!err) {
    return console.log('connected');
  } else {
    return console.error(err);
  }
});

//Configure bodyParser so we access can data using POST.
app.use(bodyParser.json(), bodyParser.urlencoded({
  extended: true
}));

//8080 port being used.
var port = process.env.PORT || 8080;

//Set our static directory.
app.use(express.static('public'));

//all our routes will be prefixed with /api
app.use('/api', router);

//Socket io module initialization.
socketIo.init(io);

//Start server.
http.listen(port, function() {
  if (mode === undefined) {
    console.log('Server access on localhost:' + port);
  } else {
    console.log('Server running in development mode PORT ' + port);
  }
});

module.exports = app;
