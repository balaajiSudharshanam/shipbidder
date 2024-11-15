const express=require('express');
const { protect } = require('../Middleware/authMiddleware');
const {createItem}=require('../Controllers/Itemcontroller');

const router=express.Router();

router.route('/').post(protect,createItem);

module.exports=router;