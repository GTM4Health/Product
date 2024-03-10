const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  pdfData: { type: Buffer, required: true },
  reportName: { type: String},
  category: { type: String },
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;