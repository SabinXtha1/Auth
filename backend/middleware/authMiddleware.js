import jwt from 'jsonwebtoken'
import  User  from '../models/user.model.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async(req,res,next)=>{
    let token;
    token = req.cookies.jwt
    if(token)
    {
        try{

            const decoded = jwt.verify(token,process.env.JSON_SECRET)
            req.user =await User.findById(decoded.userId).select('-password')
            console.log(req.user);
            next()
        }catch(err){
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
        
        
    }else{
        res.status(401)
        throw new Error('Not authorize ,no token')
    }
})
export {protect}