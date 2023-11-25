// bck/models/intel.js

const mongoose = require('mongoose');

const intelSchema = new mongoose.Schema({
  domain: { type: String, required: true },
  competitorInfo: { type: String, required: true },
  // Add any other fields you need for Competitive Intelligence
});

const Intel = mongoose.model('Intel', intelSchema);

module.exports = Intel;
