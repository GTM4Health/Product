const express = require('express');
const router = express.Router();
const Bill = require('../models/bill');

// Create a new bill
router.post('/', async (req, res) => {
  try {
    console.log('Bill creation request received');
    const {
      date,
      customerName,
      address,
      productName,
      unitCost,
      quantity,
      total,
      igst,
      totalWithGST,
      finalTotal,
    } = req.body;
    
    const bill = new Bill({
      date,
      customerName,
      address,
      productName,
      unitCost,
      quantity,
      total,
      igst,
      totalWithGST,
      finalTotal,
    });
    const savedBill = await bill.save();
    res.status(201).json({ message: 'Bill created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a bill by ID
router.delete('/delete-bill/:id', async (req, res) => {
  try {
    const deletedBill = await Bill.findByIdAndDelete(req.params.id);
    if (!deletedBill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    return res.status(200).json({ message: 'Bill deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Update a bill by ID
router.put('/update-bill/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body.data;

  try {
    const updatedBill = await Bill.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    res.json(updatedBill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Retrieve bills with pagination
router.get('/bills', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const bills = await Bill.find()
      .skip(skip)
      .limit(parseInt(limit));

    const totalBills = await Bill.countDocuments();

    res.json({
      bills,
      totalRows: totalBills,
      totalPages: Math.ceil(totalBills / parseInt(limit)),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
