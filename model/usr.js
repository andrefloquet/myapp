var mongoose = require('mongoose');

var usrSchema = mongoose.Schema({
    login: String,
    passw: String,
    ientt: String,
    ient: String
  });
  
  const Usr = mongoose.model('Usr', usrSchema);

  module.exports = Usr;