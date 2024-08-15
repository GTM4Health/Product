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

    // Preserve the last login details before recording the new login
    const lastLogin = user.lastLogin;
    const counter = user.counter;

    // Record login details (new feature from user.js model)
    await user.recordLogin();

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the token, user details, and additional login information
    res.json({
      token,
      user: { 
        name: user.name, 
        email: user.email, 
        privileges: user.privileges.accessHospitals, 
        dashPrivileges: user.privileges.accessDashboard,
        gtmPrivileges: user.privileges.accessGtmPartners,
        marketPrivileges: user.privileges.accessMarketInsights,
        csrPrivileges: user.privileges.accessCsrsFoundations,
        salesPrivileges: user.privileges.accessSales,
        formPrivilegesHC: user.privileges.formPrivilegesHC,
        formPrivilegesDD: user.privileges.formPrivilegesDD,
        ciPrivileges: user.privileges.ciPrivileges,
        counter: user.counter,
        lastLogin: lastLogin, // Use the preserved last login date
      },
      loginDetails: { counter: counter, lastLogin: lastLogin },
    });
  } catch (error) {
    console.error('Login failed', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
