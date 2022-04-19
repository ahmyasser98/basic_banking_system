const mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  phone:{
    type: String,
    required: true
  },
  balance:{
    type: Number,
    required:true
  }
});

const customers = mongoose.model('customers', customerSchema);
module.exports = customers;
