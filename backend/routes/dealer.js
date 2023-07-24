// Stores D_D Records
// Defined the dealer-distributors here.

const mongoose = require('mongoose');

const dealerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is mandatory
  },
  web:{
    type: String,
  },
  address:{
    type: String,
  },
  city: {
    type: String,
    required: true, // City is mandatory
  },
  state: {
    type: String,
    required: true, // State is mandatory
  },
  products: {
    type: String,
  },
  dealerName: {
    type: String,
  },
  role: {
    type: String,
  },
  mail: {
    type: String,
  },
  phone: {
    type: String,
  },
  GST: {
    type: String,
  }
});

module.exports = mongoose.model('Dealer', dealerSchema);
