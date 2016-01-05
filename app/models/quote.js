var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var QuoteSchema   = new Schema({
    _id: Number,
    quote: String,
    movie: String,
    character: String
});

module.exports = mongoose.model('Quote', QuoteSchema);
