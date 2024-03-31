const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  customerName: {
    type: String,
  },
  address: {
    type: String,
  },
  productName: {
    type: String,
  },
  unitCost: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  total: {
    type: Number,
  },
  igst: {
    type: Number,
  },
  totalWithGST: {
    type: Number,
  },
  finalTotal: {
    type: Number,
  },
});

module.exports = mongoose.model('Bill', billSchema);
