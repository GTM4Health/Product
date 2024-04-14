const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  leadName: {
    type: String,
  },
  healthcareCentreName: {
    type: String,
  },
  email: {
    type: String,
  },
  mobileNo: {
    type: String,
  },
  status: {
    type: String,
  },
  finalStatus: {
    type: String,
  },
  reportsBetweenDates: {
    type: String,
    default: false,
  },
  includeReports: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Sales', salesSchema);
