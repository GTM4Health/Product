const express = require("express");
const router = express.Router();
const Specialist = require("../models/specialist");
const specialist = require("../models/specialist");

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};


// @route   POST /api/admin/dashboard/specialist
// @desc    Add a new specialist
router.post("/", async (req, res) => {
  try {
    const specialist = new Specialist(req.body);
    await specialist.save();
    res.status(201).json({ message: "Specialist added successfully", specialist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/admin/dashboard/specialist
// @desc    Get all specialists
router.get("/", async (req, res) => {
  try {
    const specialists = await Specialist.find().sort({ createdAt: -1 });
    res.json(specialists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.get("/get-all", asyncHandler(async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const skip = (page - 1) * limit;

//   const [totalRows, specialists] = await Promise.all([
//     Specialist.countDocuments(),
//     Specialist.find().skip(skip).limit(limit).lean()
//   ]);

//   res.status(200).json({ specialists, totalRows, totalPages: Math.ceil(totalRows / limit) });
// }));

router.get('/get-all', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Fetch specialists with sorting and pagination
    const specialists = await Specialist.find()
      .sort({ domain: 1 })  // Sorting by "domain" in ascending order
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count of specialists
    const totalRows = await Specialist.countDocuments();
    const totalPages = Math.ceil(totalRows / limit);

    res.status(200).json({
      specialists,
      totalRows,
      totalPages,
    });
  } catch (error) {
    console.error('Error fetching specialists:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// @route   GET /api/admin/dashboard/specialist/:id
// @desc    Get a specialist by ID
router.get("/:id", async (req, res) => {
  try {
    const specialist = await Specialist.findById(req.params.id);
    if (!specialist) return res.status(404).json({ message: "Specialist not found" });
    res.json(specialist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   PUT /api/admin/dashboard/specialist/:id
// @desc    Update a specialist's details
router.put("/update-specialist/:id", async (req, res) => {
  try {
    const specialist = await Specialist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!specialist) return res.status(404).json({ message: "Specialist not found" });
    res.json({ message: "Specialist updated successfully", specialist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   DELETE /api/admin/dashboard/specialist/:id
// @desc    Delete a specialist
router.delete("/delete-specialist/:id", async (req, res) => {
  try {
    const specialist = await Specialist.findByIdAndDelete(req.params.id);
    if (!specialist) return res.status(404).json({ message: "Specialist not found" });
    res.json({ message: "Specialist deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
