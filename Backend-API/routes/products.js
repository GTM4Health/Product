const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const { query, validationResult } = require('express-validator');

// Create a new product
router.post('/', async (req, res) => {
  try {
    console.log('Product creation request received');
    const {
      companyName,
      website,
      address,
      city,
      state,
      productName,
      productCode,
      description,
      hsnCode,
      qtySets,
      unitPrice,
      totalPrice,
      GST,
    } = req.body;
    
    const product = new Product({
      companyName,
      website,
      address,
      city,
      state,
      productName,
      productCode,
      description,
      hsnCode,
      qtySets,
      unitPrice,
      totalPrice,
      GST,
    });
    const savedProduct = await product.save();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a product by ID
router.delete('/delete-product/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Update a product by ID
router.put('/update-product/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body.data;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Routes
router.get(
  '/products-portal/',
  [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1 }).toInt(),
    query('state').optional().trim(),
    query('city').optional().trim(),
  ],
  async (req, res) => {
    // Validate request query parameters
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { page = 1, limit = 10, state, city } = req.query;

      // Build query conditions
      const conditions = {};
      if (state) {
        conditions.state = state;
      }
      if (city) {
        conditions.city = city;
      }

      // Calculate skip value for pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);

      // Execute the query with pagination
      const products = await Product.find(conditions)
        .skip(skip)
        .limit(parseInt(limit));

      // Count total documents for pagination
      const totalProducts = await Product.countDocuments(conditions);

      res.json({
        products,
        totalRows: totalProducts,
        totalPages: Math.ceil(totalProducts / parseInt(limit)),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

module.exports = router;
