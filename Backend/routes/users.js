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

// Fetch user data by ID
router.get("/usr/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select('-password -passkey'); // Exclude sensitive information
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Failed to fetch user data', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
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
  

// Update a user profile
router.put("/upd-user/:id", async (req, res) => {
  const { id } = req.params;
  const { companyName, companyUrl, address, productOrService } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        companyName,
        companyUrl,
        address,
        productOrService,
      },
      { new: true }
    );

    res.json({ user: updatedUser, message: 'User updated successfully' });
  } catch (error) {
    console.error('Failed to update user', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Fetch user data by email
router.get("/user/email/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email }).select('-password -passkey'); // Exclude sensitive information
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Failed to fetch user data', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// Update a user profile by email
// router.put('/update-user/email/:email', async (req, res) => {
//   const { email } = req.params; // Destructure email from the request params
//   const { companyName, companyUrl, address, productOrService } = req.body; // Destructure fields from request body

//   try {
//     // Prepare the update object
//     const updateData = {};
    
//     if (companyName) updateData.companyName = companyName;
//     if (companyUrl) updateData.companyUrl = companyUrl;
//     if (address) updateData.address = address;
//     if (productOrService) updateData.productOrService = productOrService;

//     // Check if there's anything to update
//     if (Object.keys(updateData).length === 0) {
//       return res.status(400).json({ error: 'Please complete your profile' });
//     }

//     // Update user in the database
//     const user = await User.findOneAndUpdate(
//       { email }, // Find user by email
//       { $set: updateData }, // Only set provided fields
//       { new: true, runValidators: true } // Return the updated document and run schema validators
//     );

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // If update is successful
//     res.status(200).json({ message: 'Profile updated successfully', user });
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     res.status(500).json({ error: 'An error occurred while updating the profile' });
//   }
// });

router.put("/update-user/email/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const updatedUser = await User.findOneAndUpdate({email}, req.body, { new: true }); // Corrected req.body.data to req.body
    if (updatedUser.endDate) 
      updatedUser.endDate = new Date(updatedUser.endDate); // Corrected updatedData to updatedUser
    res.json({ user: updatedUser, message: 'User updated successfully' });
  } catch (error) {
    console.error('Failed to update user', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});
  
module.exports = router;
