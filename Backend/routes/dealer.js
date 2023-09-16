const express = require('express');
const router = express.Router();
const Dealer = require('../models/dealer');
const { query, validationResult } = require('express-validator');
//Enhance Portal & Register DD Ver 1.2.11
// Create a new dealer
router.post('/', async (req, res) => {
  try {
    console.log('Dealer creation request received');
    const { name, web, address, city, state, products, dealerName, role, mail, phone, GST } = req.body;
    const dealer = new Dealer({ name, web, address, city, state, products, dealerName, role, mail, phone, GST });
    const savedDealer = await dealer.save();
    res.status(201).json({ message: 'Dealer created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a hospital by ID
router.delete('/delete-dealer/:id', async (req, res) => {
  try {
    const deletedDealer = await Dealer.findByIdAndDelete(req.params.id);
    if (!deletedDealer) {
      return res.status(404).json({ message: 'Dealer not found' });
    }
    return res.status(200).json({ message: 'Dealer deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Update a hospital by ID
router.put('/update-dealers/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body.data;

  try {
    const updatedDealer = await Dealer.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    res.json(updatedDealer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Routes
router.get(
    '/dealers-portal/',
    [
      query('page').optional().isInt({ min: 1 }).toInt(),
      query('limit').optional().isInt({ min: 1 }).toInt(),
      query('state').optional().trim(),
      query('city').optional().trim(),
    ],
    async (req, res) => {
      // Validate request query parameters
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const { page = 1, limit = 10, state, city } = req.query;
  
        // Build query conditions
        const conditions = {};
        if (state) {
          conditions.state = state;
        }
        if (city) {
          conditions.city = city;
        }
  
        // Calculate skip value for pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
  
        // Execute the query with pagination
        const dealer = await Dealer.find(conditions)
          .skip(skip)
          .limit(parseInt(limit));
  
        // Count total documents for pagination
        const totalDealers = await Dealer.countDocuments(conditions);
  
        res.json({
          dealer,
          totalRows: totalDealers,
          totalPages: Math.ceil(totalDealers / parseInt(limit)),
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
    }
  );
  

module.exports = router;
