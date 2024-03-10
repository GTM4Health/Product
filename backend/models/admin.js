// Objects to be stored in Mongodb is mentioned here.

const mongoose = require('mongoose'); // this is db
const moment = require('moment'); // Convert from GMT to IST

const adminLoginSchema = new mongoose.Schema({
  adminEmail: {
    type: String,
    required: true,
    unique: false,
  },
  loginTime: {
    type: String, // Change the type to String to store formatted time
    default: () => moment().utcOffset('+05:30').format('DD-MM-YYYY, hh:mm:ss A'),
  },
});

const Admin = mongoose.model('Admin', adminLoginSchema);

module.exports = Admin;
