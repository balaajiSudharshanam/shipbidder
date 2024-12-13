const Bid=require('../Model/BidModel');
const asyncHandler=require('express-async-handler');
const user=require('../Model/UserModel');
const Auction = require('../Model/AuctionModel');
const { getIO } = require('../Socket/socket');

const createBid = asyncHandler(async (req, res) => {
    const { auction, bidder, bidAmount } = req.body;

    console.log(req.body);
    if (!auction || !bidder || !bidAmount) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    
    const isAuctionPresent = await Auction.findById(auction);
    if (!isAuctionPresent) {
        return res.status(400).json({ message: "Invalid auction" });
    }

    
    const bid = await Bid.create({
        auction,
        bidder,
        bidAmount,
    });

    await Auction.findByIdAndUpdate(auction,
        {$push:{bids: bid._id}},
        {new:true,useFindAndModify:false}
    )
    const populatedBid = await Bid.findById(bid._id)
        .populate('bidder', 'name email')
        .populate('auction', 'jobTitle');

    
    const io = getIO();
    io.to(auction).emit('bid placed', populatedBid);

  
    return res.status(201).json(populatedBid);
});


const getAuctionBids=asyncHandler(async(req,res)=>{
    const {auctionId}=req.params;
    const bids=await Bid.find({auction:auctionId}).populate('bidder','name email');
    return res.status(200).json(bids);
})

const getUserBids = asyncHandler(async (req, res) => {
    const { auctionId, userId } = req.query; 

    
    if (!auctionId || !userId) {
        return res.status(400).json({ message: 'Both auctionId and userId are required.' });
    }

    try {
        
        const bids = await Bid.find({
            auction: auctionId, 
            bidder: userId
        }).populate('bidder', 'name email') 
          .populate('auction', 'jobTitle'); 
        res.status(200).json(bids);
    } catch (error) {
        console.log(error);
        console.error('Error fetching user bids:', error);
        res.status(500).json({ message: 'An error occurred while fetching bids.' });
    }
});
module.exports={createBid,getAuctionBids,getUserBids};