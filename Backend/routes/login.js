//User Login validation code
//react is posting to router.  
//Router verifies with existing table in Mongodb
//Router posts results back to react
// React accordingly allows or denies access.

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Login route
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if the subscription end date is valid
    if (user.endDate && new Date() > user.endDate) {
      return res.status(401).json({ error: 'Subscription expired' });
    }

    // Record login details (new feature from user.js model)
    await user.recordLogin();

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Return the token, user details, and additional login information


    res.json({
      token,
      user: { 
        name: user.name, 
        email: user.email, 
        privileges:user.privileges.accessHospitals, 
        dashPriveleges : user.privileges.accessDashboard,
        gtmPriveleges : user.privileges.accessGtmPartners,
        marketPriveleges : user.privileges.accessMarketInsights,
        csrPriveleges : user.privileges.accessCsrsFoundations,
        salesPriveleges : user.privileges.accessSales,
        counter: user.counter,
        lastLogin: user.lastLogin
      },
      loginDetails: { counter: user.counter, lastLogin: user.lastLogin },
    });
  } catch (error) {
    console.error('Login failed', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;


