const Auction=require('../Model/AuctionModel');
const asyncHandler = require('express-async-handler');


const createAuction= asyncHandler(async(req,res)=>{
    const {
        jobTitle,
        jobDescription,
        jobProvider,
        pickupLocation,
        dropLocation,
        item,
        pickupDateTime,
        dropDateTime
      }=req.body;
      
      if (!jobTitle || !jobProvider || !pickupLocation || !dropLocation || !item || !pickupDateTime || !dropDateTime) {
        return res.status(400).json({ message: 'Please provide all required fields' });
      }

      const auction= await Auction.create(jobTitle,
        jobDescription,
        jobProvider,
        pickupLocation,
        dropLocation,
        item,
        pickupDateTime,
        dropDateTime);
        if(auction){
          res.status(202).json({
            id: auction._id,

          })
        }else{
          res.status(400);
           throw new Error("Failed to create new user");
        }
});
module.exports={createAuction};