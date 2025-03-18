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
  lastLogin: {
    type: String, // Stores the last login timestamp before updating loginTime
    default: null,
  }
});

adminLoginSchema.methods.recordLogin = async function () {
  this.lastLogin = this.loginTime; // Store current loginTime as lastLogin
  this.loginTime = moment().utcOffset('+05:30').format('DD-MM-YYYY, hh:mm:ss A'); // Update loginTime
  await this.save();
};

const Admin = mongoose.model('Admin', adminLoginSchema);

module.exports = Admin;
