const User=require('../Model/UserModel');
const asyncHandler=require('express-async-handler');
const jwt=require('jsonwebtoken');

const protect=asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ){
        try{
            token=req.headers.authorization.split(" ")[1];

            const decoded=jwt.verify(token,process.env.JWT_SECRET)
        }catch(error){
            console.log(error),
            res.status(401);
            throw new Error("not authorized, no token")
        }
    }
})