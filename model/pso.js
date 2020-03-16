var mongoose = require('mongoose');

var psoSchema = mongoose.Schema({
    code: Number,
    desc: String,
    brand: String,
    category: String,
    price: Number
  });
  
  const Pso = mongoose.model('Pso', psoSchema);

  module.exports = Pso;