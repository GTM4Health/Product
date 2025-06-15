const express = require('express');
const router = express.Router();
const Hospital = require('../models/hospital');
const { query, validationResult } = require('express-validator');



// Routes
//Dealer's Pagination, Filtration & Update V1.2.12



router.get(
  '/all',
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
      const { state, city, speciality, search, category } = req.query;

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
      //const totalPages = Math.ceil(totalHospitals / parseInt(limit));
      //const skip = (parseInt(page) - 1) * parseInt(limit);

      const hospitals = await Hospital.find(conditions)
        .sort({ name: 1 })
        // .skip(skip)
        // .limit(parseInt(limit));

      res.json({
        hospitals,
        totalRows: totalHospitals,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

router.get(
  '/select',
  [
    query('state').optional().trim(),
    query('city').optional().trim(),
    query('speciality').optional().trim(),
    query('category').optional().trim(),
    query('search').optional().trim(),
    query('addedBy').optional().trim(),
    query('startDate').optional().trim(),
    query('endDate').optional().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { page = 1, limit = 10, state, city, speciality, search, category, addedBy, startDate, endDate} = req.query;

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

      if (startDate && endDate) {
        conditions.reportDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
      }
      // Add condition to filter hospitals added by the authenticated user
      conditions.addedBy = addedBy;

      const totalHospitals = await Hospital.countDocuments(conditions);
      const totalPages = Math.ceil(totalHospitals / parseInt(limit));
      const skip = (parseInt(page) - 1) * parseInt(limit);

      const hospitals = await Hospital.find(conditions)
        .skip(skip)
        .limit(parseInt(limit));
        // .sort({ name: 1 })
        //.sort({ reportDate: -1 }) 

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


router.get(
  '/',
  [
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
        .sort({ name: 1 })
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

router.get(
  '/classic',
  [
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

router.get('/state-centers/:state/cities', async (req, res) => {
  try {
    const state = req.params.state;
    const cities = await Hospital.aggregate([
      { $match: { state: state } },
      { $group: { _id: '$city', totalCenters: { $sum: 1 } } },
      { $sort: { totalCenters: -1 } } // Add this line to sort in descending order
    ]);

    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/city/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const hospitals = await Hospital.find({ city: city }).sort({ name: 1 });
    res.json({ hospitals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/city-ad/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const hospitals = await Hospital.find({ city: city });
    res.json({ hospitals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// backend/rt/hospview.js

router.get(
  '/print-all',
  [
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
      const { state, city, speciality, search, category } = req.query;

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
        conditions.name = { $regex: new RegExp(search, 'i') };
      }
      if (category && category !== 'all') {
        conditions.category = category;
      }

      const hospitals = await Hospital.find(conditions).sort({ name: 1 });
      const totalHospitals = await Hospital.countDocuments(conditions);

      res.json({
        hospitals,
        totalRows: totalHospitals,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);


router.get('/added-dashboard', async (req, res) => {
  try {
    // Update existing documents with null 'addedBy' field to 'Admin'
    await Hospital.updateMany({ addedBy: null }, { $set: { addedBy: 'Admin' } });

    const addedCenters = await Hospital.aggregate([
      { $group: { _id: '$addedBy', totalCenters: { $sum: 1 } } },
      { $sort: { totalCenters: -1 } }
    ]);

    const formattedData = addedCenters.map((entry, index) => ({
      id: index + 1,
      user: entry._id,
      totalCenters: entry.totalCenters,
    }));

    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/hospitals/categories - Get all categories with their center counts
router.get('/categories', async (req, res) => {
  try {
    // Aggregate categories and count total centers for each
    const categories = await Hospital.aggregate([
      {
        $group: {
          _id: "$category",
          totalCenters: { $sum: 1 }
        }
      },
      {
        $sort: {
          _id: 1 // Sort categories alphabetically by name
        }
      },
      {
        $project: {
          name: "$_id",
          totalCenters: 1
        }
      }
    ]);

    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving categories" });
  }
});



router.get('/categories/:categoryName', async (req, res) => {
  const categoryName = decodeURIComponent(req.params.categoryName); // Decode category name to handle special characters like spaces

  try {
    const hospitals = await Hospital.find({ category: categoryName });

    if (hospitals.length === 0) {
      return res.status(404).json({ message: 'No hospitals found for this category' });
    }

    res.json(hospitals); // Return all hospitals in this category
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving hospitals for the category" });
  }
});





// Fetch all hospitals
router.get("/", async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json({ hospitals });
  } catch (error) {
    console.error('Failed to fetch hospital data', error);
    res.status(500).json({ error: 'Failed to fetch hospital data' });
  }
});

// GET Centre Details by ID
router.get('/centre/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch centre details from the database
    const centre = await Hospital.findById(id);

    if (!centre) {
      return res.status(404).json({ message: 'Centre not found' });
    }

    res.status(200).json(centre);
  } catch (error) {
    console.error('Error fetching centre details:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
})

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

// module.exports = router;




