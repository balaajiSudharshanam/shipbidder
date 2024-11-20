const express=require('express');
const { protect } = require('../Middleware/authMiddleware');
const { createAuction, getEmployerAuctions, getFilteredAuctions, getAuctionById } = require('../Controllers/AutionControler');
const router=express.Router();

router.route('/').post(protect,createAuction).get(protect,getFilteredAuctions);
router.route('/employer/:employerId').get(protect,getEmployerAuctions);
router.route('/:auctionId').get(protect,getAuctionById);

module.exports=router;