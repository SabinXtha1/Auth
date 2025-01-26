import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'
import generateToken from '../utils/generate.token.js'




const authUser=asyncHandler(async(req,res)=>{
       const {email,password} = req.body
       const newUser = await User.findOne({email})
       if(newUser && (await newUser.matchPasswords(password)) ){
        generateToken(res,newUser._id)
        
        res.status(201).json({
           
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            
        }) 

       }else{
        res.status(400)
        throw new Error('Invalid user email or Password')
       }
   
})

  const registerUser = asyncHandler(async(req,res)=>{
    const {fullName,email,password} = req.body
    const userExist = await User.findOne({email})
    if(userExist){
    res.status(400)
    throw new Error('User already exist')
    }
    const newUser = new User({
        fullName,
        email,
        password})
   
    await newUser.save()
    if(newUser){
        generateToken(res,newUser._id)
        
        res.status(201).json({
           
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            
        }) 
    }else{
        res.status(400)
        throw new Error('Invalid user')
    }

  })
  const logoutUser = asyncHandler(async(req,res)=>{
  res.cookie('jwt','',{
    httpOnly:true,
    expires:new Date(0)
  })
  res.status(200).json({
    message:'User Logout'
  })
  })
  const getUserProfile = asyncHandler(async(req,res)=>{
     const user = {
        _id:req.user._id,
        fullName:req.user.fullName,
        email:req.user.email
     }
    res.status(200).json(user)
  })

  const updateUserProfile = asyncHandler(async(req,res)=>{
   const user = await User.findById(req.user._id)
   if(user){
    user.fullName = req.body.fullName || user.fullName
    user.email = req.body.email || user.email
    if(req.body.password){
        user.password = req.body.password
    }
    const updateUser = await user.save()
    res.status(200).json({
        _id:updateUser._id,
        fullName:updateUser.fullName,
        email:updateUser.email
    })
   }
   else{
    res.status(404)
    throw new Error('User Not Found')
   }


  })
export {authUser,updateUserProfile,getUserProfile,logoutUser,registerUser}