// Signup Module.
// Router collects the data from React through Body messages and stores in MongodB
// Verification of Password, Email and 10 digit phone number.
// If email already present, doesn't proceed further.

const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.post('/', async (req, res) => {
  try {
    const { name, phone, email, password, role } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Check the 'email' field" });
    }

    // Validate phone number format
    // const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number format
    // if (!phoneRegex.test(phone)) {
    //   return res.status(400).json({ error: "Check the 10-digit phone number" });
    // }

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create a new user
    await User.create({ name, phone, email, password, role});

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup failed', error);
    res.status(500).json({ error: 'Signup failed' });
  }
});

module.exports = router;
