const Location = require('../Model/LocationModel');
const asyncHandler = require('express-async-handler');

// Create a new location
const createLocation = asyncHandler(async (req, res) => {
  console.log("hit");
  const { 
    pickupAddress, pickupCity, pickupState, pickupPostalCode, pickupLatitude, pickupLongitude, 
    dropAddress, dropCity, dropState, dropPostalCode, dropLatitude, dropLongitude 
  } = req.body;

  // Validate required fields for both pickup and drop locations
  if (!pickupAddress || !pickupCity || !pickupLatitude || !pickupLongitude ||
      !dropAddress || !dropCity || !dropLatitude || !dropLongitude) {
    return res.status(400).json({ message: 'Please provide all required fields for both pickup and drop locations' });
  }

  // Create the pickup location
  const pickupLocation = await Location.create({
    address: pickupAddress,
    city: pickupCity,
    state: pickupState,
    postalCode: pickupPostalCode,
    coordinates: {
      lat: pickupLatitude,
      lng: pickupLongitude
    },
    
  });

  // Create the drop location
  const dropLocation = await Location.create({
    address: dropAddress,
    city: dropCity,
    state: dropState,
    postalCode: dropPostalCode,
    coordinates: {
      lat: dropLatitude,
      lng: dropLongitude
    },
   
  });

  
  if (pickupLocation && dropLocation) {
    res.status(201).json({ pickupLocation, dropLocation });
  } else {
    res.status(400);
    throw new Error('Failed to create pickup or drop location');
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
