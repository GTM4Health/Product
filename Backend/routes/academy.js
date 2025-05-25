const express = require('express');
const router = express.Router();
const multer = require('multer');
const LearningModule = require('../models/academy');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// @route   POST /api/modules/upload
// @desc    Upload new learning module
router.post('/upload', upload.single('pdfFile'), async (req, res) => {
  try {
    const { category } = req.body;
    const pdfData = req.file.buffer;
    const contentType = req.file.mimetype;
    const filename = req.file.originalname;

    const newModule = new LearningModule({
      filename,
      contentType,
      pdfData,
      moduleName: filename,
      category
    });

    await newModule.save();
    res.status(201).json({ message: 'Learning Module uploaded successfully' });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Failed to upload module' });
  }
});

// @route   GET /api/modules/pdfs
// @desc    Fetch paginated module filenames
router.get('/pdfs', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchQuery = req.query.search || '';
    const skip = (page - 1) * limit;

    const query = searchQuery
      ? { filename: { $regex: searchQuery, $options: 'i' } }
      : {};

    const totalFiles = await LearningModule.countDocuments(query);
    const totalPages = Math.ceil(totalFiles / limit);

    const files = await LearningModule.find(query, 'filename category')
      .skip(skip)
      .limit(limit);

    res.json({
      files: files.map(f => f.filename),
      totalFiles,
      totalPages,
      currentPage: page
    });
  } catch (error) {
    console.error('Pagination fetch error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// @route   GET /api/modules/pdfs/:filename
// @desc    View PDF
router.get('/pdfs/:filename', async (req, res) => {
  try {
    const module = await LearningModule.findOne({ filename: req.params.filename });

    if (!module) return res.status(404).json({ message: 'Module not found' });

    res.setHeader('Content-Type', module.contentType);
    res.send(module.pdfData);
  } catch (error) {
    console.error('Fetch module error:', error);
    res.status(500).json({ message: 'Failed to fetch module' });
  }
});

// @route   GET /api/modules/download/:filename
// @desc    Download learning module
router.get('/download/:filename', async (req, res) => {
  try {
    const module = await LearningModule.findOne({ filename: req.params.filename });

    if (!module) return res.status(404).json({ message: 'Module not found' });

    res.setHeader('Content-Type', module.contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${module.filename}"`);
    res.send(module.pdfData);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ message: 'Failed to download module' });
  }
});

// @route   PUT /api/modules/edit/:filename
// @desc    Edit module name and category
router.put('/edit/:filename', async (req, res) => {
  try {
    const { newFileName, newCategory } = req.body;
    const module = await LearningModule.findOne({ filename: req.params.filename });

    if (!module) return res.status(404).json({ message: 'Module not found' });

    module.filename = newFileName || module.filename;
    module.category = newCategory || module.category;

    await module.save();
    res.json({ message: 'Module updated successfully', newFileName, newCategory });
  } catch (error) {
    console.error('Edit error:', error);
    res.status(500).json({ message: 'Failed to update module' });
  }
});

// @route   DELETE /api/modules/delete/:filename
// @desc    Delete learning module
router.delete('/delete/:filename', async (req, res) => {
  try {
    const deleted = await LearningModule.deleteOne({ filename: req.params.filename });

    if (deleted.deletedCount === 0)
      return res.status(404).json({ message: 'Module not found' });

    res.json({ message: 'Module deleted successfully' });
  } catch (error) {
    console.error('Deletion error:', error);
    res.status(500).json({ message: 'Failed to delete module' });
  }
});

module.exports = router;
