
var mongoose = require('mongoose');

var entSchema = mongoose.Schema({
    ientt: String,
    ient: String
});

const Ent = mongoose.model('Ent', entSchema);

module.exports = Ent;