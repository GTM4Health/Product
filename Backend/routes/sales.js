const express = require('express');
const router = express.Router();
const Sales = require('../models/sales');
const { validationResult } = require('express-validator');

// Create a new sales entry
router.post('/', async (req, res) => {
  try {
    console.log('Sales creation request received');
    const {
      leadName,
      healthcareCentreName,
      email,
      mobileNo,
      status,
      finalStatus,
      reportsBetweenDates,
      includeReports,
    } = req.body;

    const sales = new Sales({
      leadName,
      healthcareCentreName,
      email,
      mobileNo,
      status,
      finalStatus,
      reportsBetweenDates,
      includeReports,
    });
    const savedSales = await sales.save();
    res.status(201).json({ message: 'Sales entry created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a sales entry by ID
router.delete('/delete-sales/:id', async (req, res) => {
  try {
    const deletedSales = await Sales.findByIdAndDelete(req.params.id);
    if (!deletedSales) {
      return res.status(404).json({ message: 'Sales entry not found' });
    }
    return res.status(200).json({ message: 'Sales entry deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Update a sales entry by ID
router.put('/update-sales/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body.data;

  try {
    const updatedSales = await Sales.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    res.json(updatedSales);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
