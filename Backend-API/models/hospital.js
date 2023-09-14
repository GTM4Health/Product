// Stores Hospital Records
// Defined the Hospital fields here.

const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is mandatory
  },
  city: {
    type: String,
    required: true, // City is mandatory
  },
  state: {
    type: String,
    required: true, // State is mandatory
  },
  infraSer: {
    type: String,
  },
  docName: {
    type: String,
  },
  docSpez: {
    type: String,
  },
  mail: {
    type: String,
  },
  phone: {
    type: String,
  },
  speciality: {
    type: String,
  },
  lastConnected: {
    type: String,
  },
});

module.exports = mongoose.model('Hospital', hospitalSchema);
