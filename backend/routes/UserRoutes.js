const express=require('express');
const { registerUser } = require('../Controllers/UserController');
const router=express.Router();

router.route('/').post(registerUser);

module.exports=router;