// bck/routes/intel.js

const express = require('express');
const router = express.Router();
const Intel = require('../models/intel');

// Route to handle the form submission
router.post('/add-competitive-intelligence', async (req, res) => {
  try {
    const { domain, competitorInfo } = req.body;
    
    // Validate data here if necessary

    const newIntel = new Intel({
      domain,
      competitorInfo,
      // Add other fields accordingly
    });

    const savedIntel = await newIntel.save();
    res.status(201).json(savedIntel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Additional route to fetch competitive intelligence data with pagination
router.get('/competitive-intelligence', async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;

    const competitiveData = await Intel.find().skip(skip).limit(parseInt(limit));
    const totalRows = await Intel.countDocuments();

    const totalPages = Math.ceil(totalRows / limit);

    res.json({
      competitiveData,
      totalRows,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
