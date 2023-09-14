// Admin User Dashboard Table
// Data shown here at Date Activated.
// Get request made by Router to Front End. 

const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const totalRows = await User.countDocuments();
    const totalPages = Math.ceil(totalRows / limit); // Calculate total pages

    const users = await User.find().skip(skip).limit(Number(limit));

    res.json({ users, totalRows, totalPages });
  } catch (error) {
    console.error('Failed to fetch users', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

  
  
module.exports = router;
