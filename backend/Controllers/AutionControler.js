const Auction = require('../Model/AuctionModel');
const asyncHandler = require('express-async-handler');

const createAuction = asyncHandler(async (req, res) => {
  const {
    jobTitle,
    jobDescription,
    jobProvider,
    pickupLocation,
    dropLocation,
    item,
    pickupDateTime,
    dropDateTime
  } = req.body;

  // Validate required fields
  if (!jobTitle || !jobProvider || !pickupLocation || !dropLocation || !item || !pickupDateTime || !dropDateTime) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // Create auction by passing object to Auction.create
  const auction = await Auction.create({
    jobTitle,
    jobDescription,
    jobProvider,
    pickupLocation,
    dropLocation,
    item,
    pickupDateTime,
    dropDateTime
  });

  if (auction) {
    
    const populatedAuction = await auction
      .populate('jobProvider', 'name email') // Populate user details (job provider)
      .populate('pickupLocation', 'longitude latitude') // Populate pickup location
      .populate('dropLocation', 'longitude latitude') // Populate drop location
      .populate('item') // Populate item details
      

    return res.status(201).json(populatedAuction); // Return populated auction
  } else {
    res.status(400);
    throw new Error('Failed to create new auction');
  }
});

module.exports = { createAuction };
