const express = require('express');
const router = express.Router();
const Hospital = require('../models/hospital');

// Create a new hospital
router.post('/', async (req, res) => {
  try {
    console.log('Hospital creation request received');
    const { name, city, state, infraSer, docName, docSpez, mail, phone, speciality, lastConnected } = req.body;
    const hospital = new Hospital({ name, city, state, infraSer, docName, docSpez, mail, phone, speciality, lastConnected });
    const savedHospital = await hospital.save();
    res.status(201).json({ message: 'Hospital created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a hospital by ID
router.delete('/delete-hospital/:id', async (req, res) => {
  try {
    const deletedHospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!deletedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    return res.status(200).json({ message: 'Hospital deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Update a hospital by ID
router.put('/hospitals/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedHospital = await Hospital.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    res.json(updatedHospital);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
