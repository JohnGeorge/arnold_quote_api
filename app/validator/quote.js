var isvalid = require('isvalid');

validateQuote = {};

validateQuote.request = function(req, res, next) {
  isvalid(req.body, QuoteSchema, function(err, validData) {
    if (err) {
      res.json(err);
    } else {
      req.validBody = validData;
      next();
    }
  });
};

var QuoteSchema = {
  'quote': {
    type: String,
    required: true
  },
  'movie': {
    type: String,
    required: true
  },
  'character': {
    type: String,
    required: true
  }
};

module.exports = validateQuote;
