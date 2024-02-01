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

// DELETE a CSR/Foundation by ID
router.delete('/delete-csr/:id', async (req, res) => {
  try {
    const deletedCSR = await CSR.findByIdAndDelete(req.params.id);
    if (!deletedCSR) {
      return res.status(404).json({ message: 'CSR/Foundation not found' });
    }
    return res.status(200).json({ message: 'CSR/Foundation deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Update a CSR/Foundation by ID
router.put('/update-csr/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body.data;

  try {
    const updatedCSR = await CSR.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(updatedCSR);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
