const express=require('express');
const { protect } = require('../Middleware/authMiddleware');
const { createLocation } = require('../Controllers/LocationController');
const router=express.Router();

router.route('/').post(protect,createLocation);
module.exports=router;