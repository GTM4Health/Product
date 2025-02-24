const express = require('express');
const router = express.Router();
const Asset = require('../models/asset');
const { validationResult } = require('express-validator');

// Create a new asset
router.post('/', async (req, res) => {
  try {
    console.log('Asset creation request received');
    const { productName, assetNumber, emailID, observations, timestamp } = req.body;

    const asset = new Asset({
      productName,
      assetNumber,
      emailID,
      observations,
      timestamp,
    });

    await asset.save();
    res.status(201).json({ message: 'Asset created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get paginated assets with optional search
router.get('/assets-portal/', async (req, res) => {
  const { page = 1, limit = 10, searchCriteria, searchQuery, email } = req.query;

  try {
    const skip = (parseInt(page) - 1) * parseInt(limit);
    let query = {};
    if (email) {
      query.emailID = email;
    }

    if (searchCriteria && searchQuery) {
      query[searchCriteria] = { $regex: new RegExp(searchQuery, 'i') };
    }

    const assets = await Asset.find(query).skip(skip).limit(parseInt(limit)).sort({ timestamp: -1 }).exec();
    const totalAssets = await Asset.countDocuments(query);

    res.json({
      assets,
      totalRows: totalAssets,
      totalPages: Math.ceil(totalAssets / parseInt(limit)),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Fetch all assets without pagination
router.get('/all-assets', async (req, res) => {
  const { email } = req.query;
  try {
    let query = {};
    // Filter by email if provided
    if (email) {
      query.emailID = email;
    }
    const assets = await Asset.find(query).sort({ timestamp: -1 }).exec();
    res.json(assets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Fetch a single asset by ID
router.get('/:id', async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({ message: 'Asset Not Found' });
    }
    res.json(asset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete an asset by ID
router.delete('/delete-asset/:id', async (req, res) => {
  try {
    const deletedAsset = await Asset.findByIdAndDelete(req.params.id);
    if (!deletedAsset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    return res.status(200).json({ message: 'Asset deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Update an asset by ID
router.put('/update-asset/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedAsset = await Asset.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    res.json(updatedAsset);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
