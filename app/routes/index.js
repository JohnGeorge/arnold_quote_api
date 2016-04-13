var router = require('express').Router();
var path = require('path');
var Quote = require('../models/quote');
var validateQuote = require('../validator/quote');

//Route that presents webpage
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

//Get all quotes in the database.
router.get('/quotes', function(req, res) {
  Quote.find()
    .execAsync()
    .then(function(quotes) {
      res.json(quotes);
    }).catch(function(err) {
      res.status(500).send(err);
    });
});

//Get a single movie quote.
router.get('/quote/:id', function(req, res) {
  Quote.find()
    .count()
    .execAsync()
    .then(function(count) {
      if (req.params.id > count) {
        res.status(404).json({
          message: 'You are trying to access a quote that does not exist in database'
        });
      } else {
        Quote.findById(req.params.id)
          .execAsync()
          .then(function(quote) {
            res.json(quote);
          })
          .catch(function(err) {
            res.status(500).send(err);
          });
      }
    }).catch(function(err) {
      res.status(500).send(err);
    });
});

//Check if request body is valid then if quote exists add to database.
router.post('/quote', validateQuote.request, function(req, res) {
  Quote.find().count()
    .execAsync()
    .then(function(count) {
      var quote = new Quote({
        _id: count + 1,
        quote: req.validBody.quote,
        movie: req.validBody.movie,
        character: req.validBody.character
      });
      quote.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({
          message: 'Quote added'
        });
      });
    }).catch(function(err) {
      res.status(500).send(err);
    });
});


//Check if request body is valid then if quote exists then update.
router.put('/quote/:id', validateQuote.request, function(req, res) {
  Quote.find()
    .count()
    .execAsync()
    .then(function(count) {
      if (req.params.id > count) {
        res.status(404).json({
          message: 'Your are trying to update a quote that does not exist in database'
        });
      } else {
        Quote.findById(req.params.id)
          .execAsync()
          .then(function(quote) {
            quote.quote = req.validBody.quote;
            quote.movie = req.validBody.movie;
            quote.character = req.validBody.character;

            quote.save(function(err) {
              if (err) {
                res.send(err);
              }
              res.json({
                message: 'Quote updated!'
              });
            });
          })
          .catch(function(err) {
            res.status(500).send(err);
          });
      }
    }).catch(function(err) {
      res.status(500).send(err);
    });
});

//Check if quote exists then delete
router.delete('/quote/:id', function(req, res) {
  Quote.find()
    .count()
    .execAsync()
    .then(function(count) {
      if (req.params.id > count) {
        res.status(404).json({
          message: 'You are trying to delete a quote that does not exist in database'
        });
      } else {
        Quote.remove({
            _id: req.params.id
          },
          function(err) {
            if (err) {
              res.status(500).send(err);
            }
            res.json({
              message: 'Quote deleted'
            });
          });
      }
    }).catch(function(err) {
      res.status(500).send(err);
    });
});

module.exports = router;
