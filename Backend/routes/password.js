const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Route for changing password
router.post('/change', async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the current password with the user's stored password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Update the user's password (hashing is done in the model)
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Password change failed', error);
    res.status(500).json({ error: 'Password change failed' });
  }
});

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
