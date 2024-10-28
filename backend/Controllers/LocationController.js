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
const getAddressByAddressLine=asyncHandler(async(req,res)=>{
  const{addressLine}=req.query;
  if(!addressLine){
    res.status(400).json({message:"Please provide an address for search"});
    const location=await Location.find({
      address:{$regex:new RegExp(addressLine,'i')}
    });
    if(location.length>0){
      res.json(locations);
    }else{
      res.status(404).json({message:"No address found matching this address line"});
    }
  }
})

module.exports = { createLocation, getAddressByAddressLine};
