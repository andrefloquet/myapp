
var mongoose = require('mongoose');

var entSchema = mongoose.Schema({
    ientt: String,
    ient: String,
    name: String,
    unitnum: Number,
    streetnum: Number,
    street: String,
    suburb: String,
    postcode: Number 
});

const Ent = mongoose.model('Ent', entSchema);

module.exports = Ent;