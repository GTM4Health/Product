const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const Content = require('../models/content');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload content route
router.post('/upload', upload.single('pdfFile'), async (req, res) => {
  try {
    const pdfData = req.file.buffer;
    const contentType = req.file.mimetype;
    const filename = req.file.originalname;

    const newContent = new Content({ filename, contentType, pdfData });
    await newContent.save();

    res.status(201).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Content upload error:', error);
    res.status(500).json({ message: 'Failed to upload file' });
  }
});

// Fetch all PDF filenames route
router.get('/pdfs', async (req, res) => {
  try {
    const pdfFiles = await Content.find({}, 'filename'); // Fetch filenames from the database
    const filenames = pdfFiles.map(file => file.filename);
    res.json(filenames);
  } catch (error) {
    console.error('Error fetching PDF filenames:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Download content route
router.get('/download/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const content = await Content.findOne({ filename });

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.setHeader('Content-Type', content.contentType);
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.send(content.pdfData);
  } catch (error) {
    console.error('Content download error:', error);
    res.status(500).json({ message: 'Failed to download content' });
  }
});


router.put('/edit/:filename', async (req, res) => {
  try {
    const { newFileName } = req.body;
    const filename = req.params.filename;

    const existingContent = await Content.findOne({ filename });

    if (!existingContent) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Update the filename in the database
    existingContent.filename = newFileName;
    await existingContent.save();

    res.json({ message: 'File name updated successfully', newFileName });
  } catch (error) {
    console.error('Content edit error:', error);
    res.status(500).json({ message: 'Failed to update file name' });
  }
});



// Delete content route
router.delete('/delete/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;

    await Content.deleteOne({ filename });

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Content deletion error:', error);
    res.status(500).json({ message: 'Failed to delete file' });
  }
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const mongoose = require('mongoose');
// const Content = require('../models/content');

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Upload content route
// router.post('/upload', upload.single('pdfFile'), async (req, res) => {
//   try {
//     const pdfData = req.file.buffer;
//     const contentType = req.file.mimetype;
//     const filename = req.file.originalname;

//     const newContent = new Content({ filename, contentType, pdfData });
//     await newContent.save();

//     res.status(201).json({ message: 'File uploaded successfully' });
//   } catch (error) {
//     console.error('Content upload error:', error);
//     res.status(500).json({ message: 'Failed to upload file' });
//   }
// });

// // Fetch all PDF filenames route
// router.get('/pdfs', async (req, res) => {
//     try {
//       const pdfFiles = await Content.find({}, 'filename'); // Fetch filenames from the database
//       const filenames = pdfFiles.map(file => file.filename);
//       res.json(filenames);
//     } catch (error) {
//       console.error('Error fetching PDF filenames:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });

//   router.get('/pdfs/:filename', async (req, res) => {
//     try {
//       const filename = req.params.filename;
//       const content = await Content.findOne({ filename }); // Find content by filename
      
//       if (!content) {
//         return res.status(404).json({ message: 'Content not found' });
//       }
  
//       res.setHeader('Content-Type', content.contentType);
//       res.send(content.pdfData);
//     } catch (error) {
//       console.error('Content retrieval error:', error);
//       res.status(500).json({ message: 'Failed to fetch content' });
//     }
//   });
  
//   module.exports = router;
// Retrieve content by ID route
// router.get('/pdfs/:id', async (req, res) => {
//   try {
//     const id = mongoose.Types.ObjectId(req.params.id);
//     const content = await Content.findById(id);
    
//     if (!content) {
//       return res.status(404).json({ message: 'Content not found' });
//     }

//     res.setHeader('Content-Type', content.contentType);
//     res.send(content.pdfData);
//   } catch (error) {
//     console.error('Content retrieval error:', error);
//     res.status(500).json({ message: 'Failed to fetch content' });
//   }
// });


