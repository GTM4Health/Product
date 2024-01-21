const mongoose = require('mongoose');

const csrSchema = new mongoose.Schema({
  csrName: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  domain: {
    type: String,
  },
});

module.exports = mongoose.model('CSR', csrSchema);
