const express=require('express');
const { registerUser, authUser, allUsers } = require('../Controllers/UserController');
const {protect} = require('../Middleware/authMiddleware');
const router=express.Router();

router.route('/').post(registerUser).get(protect,allUsers);
router.route('/auth').post(authUser);

module.exports=router;