const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Route for password reset
router.post('/reset', async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.password = newPassword;
    // Hash the new password
    //const hashedPassword = await bcrypt.hash(newPassword, 10);

    //user.password = hashedPassword;
     // Update passkey with the new password
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Password reset failed', error);
    res.status(500).json({ error: 'Password reset failed' });
  }
});

module.exports = router;
