const express=require('express');
const { protect } = require('../Middleware/authMiddleware');

const{createBid, getAuctionBids}=require('../Controllers/BidController');
const router=express.Router();

router.route('/').post(protect,createBid);
router.route('/:auctionId').get(protect,getAuctionBids);
module.exports=router;