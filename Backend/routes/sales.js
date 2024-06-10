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
      emailID,
      healthcareCentreName,
      email,
      mobileNo,
      status,
      finalStatus,
      reportsBetweenDates,
      reportDate,
    } = req.body;

    const sales = new Sales({
      leadName,
      emailID,
      healthcareCentreName,
      email,
      mobileNo,
      status,
      finalStatus,
      reportsBetweenDates,
      reportDate,
    });
    const savedSales = await sales.save();
    res.status(201).json({ message: 'Sales entry created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/delete-sale/:id', async (req, res) => { // Updated endpoint
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
router.put('/update-sale/:id', async (req, res) => { // Updated endpoint
  const { id } = req.params;
  const updatedData = req.body.data; // No need for data key

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

// DELETE a sales entry by ID
// router.delete('/delete-sales/:id', async (req, res) => {
//   try {
//     const deletedSales = await Sales.findByIdAndDelete(req.params.id);
//     if (!deletedSales) {
//       return res.status(404).json({ message: 'Sales entry not found' });
//     }
//     return res.status(200).json({ message: 'Sales entry deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Server error' });
//   }
// });

// // Update a sales entry by ID
// router.put('/update-sales/:id', async (req, res) => {
//   const { id } = req.params;
//   const updatedData = req.body.data;

//   try {
//     const updatedSales = await Sales.findByIdAndUpdate(id, updatedData, {
//       new: true,
//       runValidators: true,
//     });
//     res.json(updatedSales);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// GET sales data with pagination
// router.get('/get-sales', async (req, res) => {
//   const { page = 1, limit = 10 } = req.query;
//   try {
//     const sales = await Sales.find()
//       .sort({ reportDate: -1 }) 
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .exec();
//     const count = await Sales.countDocuments();
//     res.status(200).json({
//       sales,
//       totalPages: Math.ceil(count / limit),
//       currentPage: page,
//       totalRows: count,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// GET sales data with pagination and date filtering
router.get('/get-sales', async (req, res) => {
  const { page = 1, limit = 10, startDate, endDate, email} = req.query;
  try {
    let query = {};

    // Filter by date range if provided
    if (startDate && endDate) {
      query.reportDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    // Filter by email if provided
    if (email) {
      query.emailID = email;
    }

    const sales = await Sales.find(query)
      .sort({ reportDate: -1 }) 
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Sales.countDocuments(query);

    res.status(200).json({
      sales,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalRows: count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
