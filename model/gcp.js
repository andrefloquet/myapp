var mongoose = require('mongoose');

var gcpSchema = mongoose.Schema({
    name: String,
    code: String,
    desc: String
  });
  
  const Gcp = mongoose.model('Gcp', gcpSchema);

  module.exports = Gcp;