const express = require('express');
const router = express.Router();
const CSR = require('../models/csr');
const { validationResult } = require('express-validator');

// Create a new CSR/Foundation
router.post('/', async (req, res) => {
  try {
    console.log('CSR/Foundation creation request received');
    const { csrName, website, domain } = req.body;

    const csr = new CSR({
      csrName,
      website,
      domain,
    });

    const savedCSR = await csr.save();
    res.status(201).json({ message: 'CSR/Foundation created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Routes
router.get('/csrs-portal/', async (req, res) => {
  const { page, limit, searchCriteria, searchQuery } = req.query;
    // Validate request query parameters
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      const skip = (parseInt(page) - 1) * parseInt(limit);

      let query = {};
      // Example MongoDB query handling in your backend route

    if (searchCriteria && searchQuery) {
      query[searchCriteria] = { $regex: new RegExp(searchQuery, 'i') };
    }
// Use the `query` object in your MongoDB find operation

      if (searchQuery && searchCriteria) {
        query[searchCriteria] = { $regex: new RegExp(searchQuery, 'i') };
      }

      const csrs = await CSR.find(query)
        .skip(skip)
        .limit(parseInt(limit));

      const totalCSRs = await CSR.countDocuments(query);

      res.json({
        csrs,
        totalRows: totalCSRs,
        totalPages: Math.ceil(totalCSRs / parseInt(limit)),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

// Route to fetch all CSRs/Foundations without pagination
router.get('/all-csrs', async (req, res) => {
  try {
    const csrs = await CSR.find();
    res.json(csrs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
