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

// Update a user
// Update a user
router.put("/update-user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body.data, { new: true }); // Corrected req.body.data to req.body
    if (updatedUser.endDate) 
      updatedUser.endDate = new Date(updatedUser.endDate); // Corrected updatedData to updatedUser
    res.json({ user: updatedUser, message: 'User updated successfully' });
  } catch (error) {
    console.error('Failed to update user', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// router.put("/update-user/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const updatedUser = await User.findByIdAndUpdate(id, req.body.data, { new: true });
//     if (updatedUser.endDate) 
//       updatedUser.endDate = new Date(updatedData.endDate);
//     res.json({ user: updatedUser, message: 'User updated successfully' });
//   } catch (error) {
//     console.error('Failed to update user', error);
//     res.status(500).json({ error: 'Failed to update user' });
//   }
// });


// Delete a user
router.delete("/delete-user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Failed to delete user', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});
  
  
module.exports = router;
