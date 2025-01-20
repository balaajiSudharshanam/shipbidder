const Auction = require('../Model/AuctionModel');
const User=require('../Model/UserModel');
const asyncHandler = require('express-async-handler');
const { getIO } = require('../Socket/socket');
// const {io} =require('../index');
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

  console.log("auctio hit");
  if (!jobTitle || !jobProvider || !pickupLocation || !dropLocation || !item || !pickupDateTime || !dropDateTime) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  
  
   const user=  await User.findById(jobProvider);
   
  
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


  //   io.to(jobProvider).emit('auctionUpdated',populatedAuction);
  // return res.status(201).json(populatedAuction)

  const io=getIO();
  io.to(jobProvider).emit('auctioinCreated',populatedAuction);
  return res.status(201).json(populatedAuction)
  
  }else{
    return res.sendStatus(403).json({message:"Only Employer can create an auction"})
  }

 
  
});
const getAuctionById = asyncHandler(async (req, res) => {
  const { auctionId } = req.params;

  if (!auctionId) {
    return res.status(400).json({ message: 'Please provide auctionID' });
  }

  const auction = await Auction.findById(auctionId)
    .populate('item')
    .populate('pickupLocation','coordinates')
    .populate('dropLocation','coordinates')
    .populate({
      path: 'bids',
      populate: {
        path: 'bidder',
        select: 'name email', 
      },
    });

  if (!auction) {
    return res.status(404).json({ message: 'Auction not found' });
  }
console.log(auction);
  res.json(auction);
});

const getEmployerAuctions = asyncHandler(async (req, res) => {
  const { employerId } = req.params; 

  
  const auctions = await Auction.find({ jobProvider: employerId })
    .populate('jobProvider', 'name email') 
    .populate('pickupLocation', 'longitude latitude')
    .populate('dropLocation', 'longitude latitude')
    .populate('item')
    .populate({
      path: 'bids',
      populate: {
        path: 'bidder',
        select: 'name email', 
      },
    });;

  if (!auctions || auctions.length === 0) {
    return res.status(404).json({ message: 'No auctions found for this employer' });
  }

  res.json(auctions);
});
const getFilteredAuctions = asyncHandler(async (req, res) => {
  const { jobTitle, category, location, status, page = 1, limit = 10 } = req.query;

  const filter = {};
  if (jobTitle) filter.jobTitle = { $regex: jobTitle, $options: 'i' };
  if (category) filter['item.category'] = category;
  if (status) filter.status = status;
  if(location) filter.location=location;
  

  const auctions = await Auction.find(filter)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .populate('jobProvider', 'name email')
    .populate('pickupLocation', 'longitude latitude')
    .populate('dropLocation', 'longitude latitude')
    .populate('item');

  res.json({ page, limit, total: auctions.length, auctions });
});
 
const closeOldAuctions=asyncHandler(async()=>{
  try{
    const threeDaysAgo=new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate()-3);
// To fetch the auctions to be close
  const auctionsToClose=await Auction.updateMany(
    {createdAt: {$lt:threeDaysAgo},status:{$ne:'closed'}},
    

    
  ).populate('bids');

  for(const auction of auctionsToClose){
    if(auctions.bids.length>0){
      let lowestBid =auction.bids.reduce((minBid,currentBid)=>
        currentBid.bidAmount<minBid.bidAmount?currentBid:minBid
      );
      auction.won=lowestBid.bidder;
    }
    auctions.status='Closed'
      await auction.save();
  }
  
  }catch(error){
    console.log('Error updating old auctions :', error);
  }
})

module.exports = { createAuction, getEmployerAuctions,getFilteredAuctions, getAuctionById, closeOldAuctions};
