const express = require('express');
const router = express.Router();
const Startup = require('../models/startup');
const { query, validationResult } = require('express-validator');

// Create a new startup
router.post('/', async (req, res) => {
  try {
    console.log('Startup creation request received');
    const { startupName, website, productStage, domain } = req.body;

    const startup = new Startup({
      startupName,
      website,
      productStage,
      domain,
    });
    const savedStartup = await startup.save();
    res.status(201).json({ message: 'Startup created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a startup by ID
router.delete('/delete-startup/:id', async (req, res) => {
  try {
    const deletedStartup = await Startup.findByIdAndDelete(req.params.id);
    if (!deletedStartup) {
      return res.status(404).json({ message: 'Startup not found' });
    }
    return res.status(200).json({ message: 'Startup deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Update a startup by ID
router.put('/update-startup/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body.data;

  try {
    const updatedStartup = await Startup.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(updatedStartup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Routes
router.get(
  '/startups-portal/',
  [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1 }).toInt(),
  ],
  async (req, res) => {
    // Validate request query parameters
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { page = 1, limit = 10 } = req.query;

      // Calculate skip value for pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);

      // Execute the query with pagination
      const startups = await Startup.find()
        .skip(skip)
        .limit(parseInt(limit));

      // Count total documents for pagination
      const totalStartups = await Startup.countDocuments();

      res.json({
        startups,
        totalRows: totalStartups,
        totalPages: Math.ceil(totalStartups / parseInt(limit)),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

// Route to fetch all startups without pagination
router.get('/all-startups', async (req, res) => {
  try {
    const startups = await Startup.find();
    res.json(startups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
