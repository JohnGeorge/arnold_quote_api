$(document).ready(function(){
  var socket = io();

  socket.on('data', function(data){
    //Json data received from server.
    var json = JSON.parse(data);
    //Random number generated.
    var quoteInt = Math.floor((Math.random() * json.length) * 1);

    //Variables set from json values.
    var quoteNmbr = json[quoteInt]._id;
    var quote = json[quoteInt].quote;
    var movie = json[quoteInt].movie;
    var character = json[quoteInt].character;

    //Quotes written to document.
    $('.quote_nmbr').html('Quote -  ' + quoteNmbr);
    $('.quote').html(quote);
    $('.movie').html(movie);
    $('.character').html(' - ' + character);
  });
});
