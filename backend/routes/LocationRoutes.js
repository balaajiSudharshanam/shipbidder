const express=require('express');
const { protect } = require('../Middleware/authMiddleware');
const { createLocation, getAddressByAddressLine } = require('../Controllers/LocationController');
const router=express.Router();

router.route('/').post(protect,createLocation);
router.route('/search').get(protect,getAddressByAddressLine)
module.exports=router;