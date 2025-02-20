// A Model for Asset Tracking Module
// Testing by Shashi
// Testing by Shashi. Camel case being used.

const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  productName:{
    type:String
  },
  assetNumber: {
    type: String,
  },
  emailID: {
    //taken from user collection
    type: String,
  },
observations: {
  //to be added/updated by user.
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Auto-generate timestamp if not provided
  },
});

module.exports = mongoose.model('Asset', assetSchema);