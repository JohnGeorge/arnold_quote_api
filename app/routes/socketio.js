var io = {};
var socketIo = {};
var Quote = require('../models/quote');

socketIo.init = function(socketIo) {
  io = socketIo;

  //Sending the data from database to the client through socket.
  io.on('connection', function(socket) {
    Quote.find()
      .execAsync()
      .then(function(quotes) {
        var q = JSON.stringify(quotes);
        socket.emit('data', q);
      }).catch(function(err) {
        send(err);
      });
  });
};

module.exports = socketIo;
