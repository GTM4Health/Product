// User model for storing in MongodB
// User Data like Name, Email, phone number, Role.

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,// To avoid duplication
  },
  password: {
    type: String,
    required: true,
  },
  passkey: {
    type: String,
  },
  role: {
    type: String,
    // required: true,
  },
  counter: {
    type: Number, // Change the type to Number for login counter
    default: 0,
  },
  lastLogin: {
    type: String,
  },
  activationTime: {
    type: String, // Change the type to String to store formatted time
    default: () => moment().utcOffset('+05:30').format('DD-MMM-YYYY, hh:mm:ss A'), // Set default value using moment.js
  },
  privileges: {
    accessDashboard: { type: Boolean, default: true },
    accessHospitals: { type: Boolean, default: false },
    accessGtmPartners: { type: Boolean, default: false },
    accessMarketInsights: { type: Boolean, default: false },
    accessCsrsFoundations: { type: Boolean, default: false },
    accessSales : {type: Boolean, default:false},
    formPrivilegesHC : {type: Boolean, default: false}
  },
  endDate: {
    type: String,
    default: '',
    set: function(value) {
      if (value != null && value !== '') {
        return moment(value).utcOffset('+05:30').format('DD-MMM-YYYY');
      } else {
        return undefined;
      }
  },
}
});

userSchema.methods.recordLogin = async function () {
  try {
    this.counter += 1;
    this.lastLogin = moment().utcOffset('+05:30').format('DD-MMM-YYYY, hh:mm:ss A');
    await this.save();
  } catch (error) {
    throw error;
  }
};

// Before saving the user, hash the password if it has been modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    this.passkey = this.password; // Store the password in the "pass-key" field
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
