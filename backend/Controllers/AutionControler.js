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

  // Create auction
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

  // Re-fetch the auction to allow population
  const populatedAuction = await Auction.findById(auction._id)
    .populate('jobProvider', 'name email')
    .populate('pickupLocation', 'longitude latitude')
    .populate('dropLocation', 'longitude latitude')
    .populate('item');

  return res.status(201).json(populatedAuction); // Return populated auction
});

module.exports = { createAuction };
