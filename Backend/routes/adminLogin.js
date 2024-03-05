// Import required modules and dependencies
const express = require('express'); 
const bcrypt = require('bcrypt'); // For hashing from browser side.
const jwt = require('jsonwebtoken');// For Hashing the password. Currently this feature is inactive
const Admin = require('../models/admin');

// Create an instance of the express router
const router = express.Router();

// Admin login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // console.log('Received login request:', email, password);

  try {
    // Verify admin credentials
    if (email === 'a@a' && password === '123') {
      console.log('Admin credentials verified');

      // Store the admin login date
      await Admin.create({ adminEmail: email });

      // console.log('Admin login date stored');

      // Generate a JWT token for authentication
      const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET);

      // console.log('Token generated:', token);

      res.status(200).json({ token });
    } else {
      console.log('Invalid credentials');
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Admin login error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
