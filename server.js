//Call our packages and define our app.
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Connect to database.
var mongoose = require('mongoose');
mongoose.connect('<your MongoDB URI>');

//Check for errors.
mongoose.connection.on('error', function(err){
  if(!err) return console.log('connected');
  else return console.error(err);
});

//Configure bodyParser so we access can data using POST.
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

//8080 port being used.
var port = process.env.PORT || 8080;

//Import quote mongo schema.
var Quote = require('./app/models/quote')

//Set our static directory.
app.use(express.static('public'));

//Create instance of the express router to create routes.
var router = express.Router();

//Do logging when the API is being requested.
router.use(function(req, res, next) {
    console.log('Request being made.');
    next(); // make sure we go to the next routes and don't stop here
});

//---------------ROUTES START----------------//

//all our routes will be prefixed with /api
app.use('/api', router);

//Route that present
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the Arnold Schwarzenegger movie quote API!'});
});

//Get all quotes in the database in JSON format.
router.route('/quotes').get(function(req, res){
  Quote.find(function(err, quotes){
    if(err)
      res.send(err);

    res.json(quotes);
  });
});

//Get single movie quote through id in JSON format.
router.route('/quote/:id').get(function(req, res){
  Quote.findById(req.params.id, function(err, quote){
    if(err)
      res.send(err);

    res.json(quote);
  });
});

//Change quote in database using PUT method.
router.route('/quote/:id').put(function(req, res){
  Quote.findById(req.params.id, function(err, quote){
    if(err)
      res.send(err);

    quote.id = req.body._id;
    quote.quote = req.body.quote;
    quote.movie = req.body.movie;
    quote.character = req.body.character;

    quote.save(function(err){
      if(err)
        res.send(err);

      res.json({ message: 'Quote updated!' });
    })
  });
});

///Delete quote from database by finding quote _id and using DELETE.
router.route('/quote/:id').delete(function(req, res){
  Quote.remove({ _id: req.params.id },
    function(err, quote){
      if(err)
        res.send(err);

      res.json({ message: 'Quote deleted'});
  });
});

//Add quote to the database using POST method.
router.route('/quote').post(function(req, res){
  var quote = new Quote({ _id: req.body._id, quote: req.body.quote, movie: req.body.movie, character: req.body.character });
  quote.save(function(err){
    if(err)
      res.send(err);

    res.json({ message: 'Quote added!' });
  });
});

//---------------ROUTES END--------------------//

//Sending the data from database to the client through socket.
io.on('connection', function(socket){
  Quote.find(function(err, quotes){
    if(err)
      send(err);

    var q = JSON.stringify(quotes);
    socket.emit('data', q);
  });
});

//Start server.
http.listen(8080, function() {
	console.log('Server access on localhost:8080');
});
