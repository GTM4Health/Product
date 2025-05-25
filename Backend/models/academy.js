const mongoose = require('mongoose');

const learningModuleSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  pdfData: { type: Buffer, required: true },
  moduleName: { type: String }, // Custom label if needed
  category: { type: String }
});

const LearningModule = mongoose.model('LearningModule', learningModuleSchema);

module.exports = LearningModule;
