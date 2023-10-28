// backend/models/project.js
const mongoose = require('mongoose');

// Define the Project schema
const projectSchema = new mongoose.Schema({
  startupName: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  progress: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

// Create a Project model based on the schema
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
