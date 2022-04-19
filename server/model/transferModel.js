const mongoose = require('mongoose');

var transferSchema = new mongoose.Schema({
  from_name:{
    type: String,
    required: true
  },
  to_name:{
    type: String,
    required: true
  },
  amount:{
    type: Number,
    required: true
  }
});

const transfers = mongoose.model('transfers', transferSchema);
module.exports = transfers;
