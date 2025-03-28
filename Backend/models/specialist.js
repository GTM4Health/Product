// Stores Specialist Records
// Defines the medical specialists here.

const mongoose = require("mongoose");

const specialistSchema = new mongoose.Schema({
  doctorName: {
    type: String,
  },
  specialistIn: {
    type: String,
  },
  qualifications: {
    type: String,
  },
  yearsExperience: {
    type: String,
  },
  workExperience: {
    type: String,
  },
  location: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  email: {
    type: String,
  },
  mobNumber: {
    type: String,
  },
  addedBy: {
    type: String,
  },
  addedOnTime: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("Specialist", specialistSchema);
