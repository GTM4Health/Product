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

module.exports = router;
