const Location = require('../Model/LocationModel');
const asyncHandler = require('express-async-handler');

// Create a new location
const createLocation = asyncHandler(async (req, res) => {
  const { address, city, state, postalCode, latitude, longitude } = req.body;

  // Validate required fields
  if (!address || !city || !latitude || !longitude) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // Create the location
  const location = await Location.create({
    address,
    city,
    state,
    postalCode,
    coordinates: {
      lat: latitude,
      lng: longitude
    }
  });

  if (location) {
    res.status(201).json(location);
  } else {
    res.status(400);
    throw new Error('Failed to create location');
  }
});

module.exports = { createLocation };
