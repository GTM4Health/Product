const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  startupName: {
    type: String,
    required: true, // Startup Name is mandatory
  },
  website: {
    type: String,
  },
  productStage: {
    type: String,
  },
  domain: {
    type: String,
  },
});

module.exports = mongoose.model('Startup', startupSchema);
