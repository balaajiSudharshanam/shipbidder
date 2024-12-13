const express=require('express');
const { protect } = require('../Middleware/authMiddleware');

const{createBid, getAuctionBids, getUserBids}=require('../Controllers/BidController');
const router=express.Router();

router.route('/').post(protect,createBid).get(protect,getUserBids);
router.route('/:auctionId').get(protect,getAuctionBids);

module.exports=router;