const Bid=require('../Model/BidModel');
const asyncHandler=require('express-async-handler');
const user=require('../Model/UserModel');
const Auction = require('../Model/AuctionModel');
const { getIO } = require('../Socket/socket');

const createBid=asyncHandler(async(req,res)=>
{
    const{auction,bidder,bidAmount}=req.body;

    if(!auction||!bidder||!bidAmount){
        res.status(400),json({message:"please fill all the fields"});
    }
    const Auction=await Auction.findById(auction);
    if(Auction){
        const bid=await Bid.create({
            auction,
            bidder,
            bidAmount
        });
    }else{
        res.status(400).json({message:'Invalid auction'});
    }
    
    const populatedBid=await Bid.findById(bid._id)
    .populate('bidder','name email').populate('auction', 'jobTitle');
    const io=getIO();
    io.to(auction).emit('bid placed',populatedBid);
    return res.status(401).json(populatedBid);
    
});

const getAuctionBids=asyncHandler(async(req,res)=>{
    const {auctionId}=req.params;
    const bids=await Bid.find({auction:auctionId}).populate('bidder','name email');
    return res.status(200).json(bids);
})
module.exports={createBid,getAuctionBids};