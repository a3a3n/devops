//routes/vehicles.js
const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err, message: 'Error fetching vehicles' });
  }
});

router.post('/', async (req, res) => {
  const { make, model, year } = req.body;

  try {
    const newVehicle = new Vehicle({
      make,
      model,
      year,
    });

    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(500).json({ error: err, message: 'Error saving vehicle' });
  }
});

router.put('/:id', async (req, res) => {
  const { make, model, year } = req.body;

  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      {
        make,
        model,
        year,
      },
      { new: true }
    );

    res.json(updatedVehicle);
  } catch (err) {
    res.status(500).json({ error: err, message: 'Error updating vehicle' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Vehicle.findByIdAndRemove(req.params.id);
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err, message: 'Error deleting vehicle' });
  }
});

module.exports = router;
