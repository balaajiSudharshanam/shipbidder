const Auction = require('../Model/AuctionModel');
const User=require('../Model/UserModel');
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
  try{
   const user= User.findById(jobProvider);
   
  }catch(e){
    console.log(e);
  }
  if(user.role=="provider"){
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
    const populatedAuction = await Auction.findById(auction._id)
    .populate('jobProvider', 'name email')
    .populate('pickupLocation', 'longitude latitude')
    .populate('dropLocation', 'longitude latitude')
    .populate('item');

  return res.status(201).json(populatedAuction)
  }else{
    return res.sendStatus(403).json({message:"Only Employer can create an auction"})
  }

  // Re-fetch the auction to allow population
  ; 
});
const getEmployerAuctions = asyncHandler(async (req, res) => {
  const { employerId } = req.params; 

  
  const auctions = await Auction.find({ jobProvider: employerId })
    .populate('jobProvider', 'name email') 
    .populate('pickupLocation', 'longitude latitude')
    .populate('dropLocation', 'longitude latitude')
    .populate('item');

  if (!auctions || auctions.length === 0) {
    return res.status(404).json({ message: 'No auctions found for this employer' });
  }

  res.json(auctions);
});
const getFilteredAuctions = asyncHandler(async (req, res) => {
  const { jobTitle, category, minPrice, maxPrice, status, page = 1, limit = 10 } = req.query;

  const filter = {};
  if (jobTitle) filter.jobTitle = { $regex: jobTitle, $options: 'i' };
  if (category) filter['item.category'] = category;
  if (status) filter.status = status;
  if (minPrice || maxPrice) filter['item.price'] = { ...(minPrice && { $gte: minPrice }), ...(maxPrice && { $lte: maxPrice }) };

  const auctions = await Auction.find(filter)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .populate('jobProvider', 'name email')
    .populate('pickupLocation', 'longitude latitude')
    .populate('dropLocation', 'longitude latitude')
    .populate('item');

  res.json({ page, limit, total: auctions.length, auctions });
});

module.exports = { createAuction, getEmployerAuctions,getFilteredAuctions};
