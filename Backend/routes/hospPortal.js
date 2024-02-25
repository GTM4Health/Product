const express = require('express');
const router = express.Router();
const Hospital = require('../models/hospital');
const { query, validationResult } = require('express-validator');

// Routes
//Dealer's Pagination, Filtration & Update V1.2.12



router.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1 }).toInt(),
    query('state').optional().trim(),
    query('city').optional().trim(),
    query('speciality').optional().trim(),
    query('category').optional().trim(),
    query('search').optional().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { page = 1, limit = 10, state, city, speciality, search, category } = req.query;

      const conditions = {};
      if (state && state !== 'all') {
        conditions.state = state;
      }
      if (city && city !== 'all') {
        conditions.city = city;
      }
      if (speciality && speciality !== 'all') {
        conditions.speciality = speciality;
      }
      if (search) {
        // Add a search condition for the hospital name
        conditions.name = { $regex: new RegExp(search, 'i') };
      }
      if (category && category !== 'all') {
        conditions.category = category;
      }

      const totalHospitals = await Hospital.countDocuments(conditions);
      const totalPages = Math.ceil(totalHospitals / parseInt(limit));
      const skip = (parseInt(page) - 1) * parseInt(limit);

      const hospitals = await Hospital.find(conditions)
        .skip(skip)
        .limit(parseInt(limit));

      res.json({
        hospitals,
        totalRows: totalHospitals,
        totalPages,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);



router.get('/state-centers', async (req, res) => {
  try {
    // const stateCenters = await HospitalModel.aggregate([
    //   { $group: { _id: '$state', totalCenters: { $sum: 1 } } },
    // ]);
    const stateCenters = await Hospital.aggregate([
      { $match: { state: { $ne: undefined, $ne: 'all' } } },
      { $group: { _id: '$state', totalCenters: { $sum: 1 } } },
    ]);
    

    const formattedData = stateCenters.map((entry, index) => ({
      id: index + 1,
      state: entry._id,
      totalCenters: entry.totalCenters,
    }));

    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

// router.get(
//   '/',
//   [
//     query('page').optional().isInt({ min: 1 }).toInt(),
//     query('limit').optional().isInt({ min: 1 }).toInt(),
//     query('state').optional().trim(),
//     query('city').optional().trim(),
//   ],
//   async (req, res) => {
//     // Validate request query parameters
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const { page = 1, limit = 10, state, city } = req.query;

//       // Build query conditions
//       const conditions = {};
//       if (state && state !== 'all') {
//         conditions.state = state;
//       }
//       if (city && city !== 'all') {
//         conditions.city = city;
//       }

//       // Execute the query to get the total count of hospitals
//       const totalHospitals = await Hospital.countDocuments(conditions);

//       // Calculate total pages for pagination
//       const totalPages = Math.ceil(totalHospitals / parseInt(limit));

//       // Calculate skip value for pagination
//       const skip = (parseInt(page) - 1) * parseInt(limit);

//       // Execute the query with pagination
//       const hospitals = await Hospital.find(conditions)
//         .skip(skip)
//         .limit(parseInt(limit));

//       res.json({
//         hospitals,
//         totalRows: totalHospitals,
//         totalPages,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   }
// );

module.exports = router;

// Fetch all hospitals
// router.get("/", async (req, res) => {
//   try {
//     const hospitals = await Hospital.find();
//     res.json({ hospitals });
//   } catch (error) {
//     console.error('Failed to fetch hospital data', error);
//     res.status(500).json({ error: 'Failed to fetch hospital data' });
//   }
// });


