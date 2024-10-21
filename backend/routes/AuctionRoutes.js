const express=require('express');
const { protect } = require('../Middleware/authMiddleware');
const { createAuction } = require('../Controllers/AutionControler');
const router=express.Router();

router.route('/').post(protect,createAuction).get(protect,getAllauction);