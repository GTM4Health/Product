const express = require('express'); 
const bcrypt = require('bcrypt'); // For hashing from browser side.
const jwt = require('jsonwebtoken'); // For token generation
const Admin = require('../models/admin');

const router = express.Router();

// Admin login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === 'admin@gtmscale.in' && password === 'Launch_GS123$') {
      console.log('Admin credentials verified');

      // Find existing admin entry
      let admin = await Admin.findOne({ adminEmail: email });

      let lastLogin = admin ? admin.lastLogin : null; // Preserve previous last login

      if (!admin) {
        // Create a new admin entry if not found
        admin = await Admin.create({ adminEmail: email });
      } else {
        // Update last login and login time
        await admin.recordLogin();
      }

      // Generate a JWT token
      const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET);

      res.status(200).json({ token, lastLogin });
    } else {
      console.log('Invalid credentials');
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Admin login error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Public endpoint to fetch last login without credentials
router.get('/last-login', async (req, res) => {
  try {
    const admin = await Admin.findOne({ adminEmail: "admin@gtmscale.in" });
    if (!admin) {
      return res.status(404).json({ lastLogin: null });
    }

    res.status(200).json({ lastLogin: admin.lastLogin });
  } catch (error) {
    console.error('Error fetching last login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
