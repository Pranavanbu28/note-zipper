
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const registerUser =asyncHandler(async(req,res)=>{
    const{email,name,password,isAdmin,pic} = req.body
    const available = await User.findOne({email});
    if(available){
        res.status(400)
        throw new Error("User already exists")
    }
    const newUser = await User.create({
        email,name,password,pic
    })

    if(newUser){
        console.log(newUser.email)
        res.status(201).json({
            _id:newUser._id,
            email:newUser.email,
            pic:newUser.pic,
            token:generateToken(newUser._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Couldn't create user")
    }
})
const authUser =asyncHandler(async(req,res)=>{
    const{email,password} = req.body
    const available = await User.findOne({email});
    if(available && (await available.matchPassword(password))){
        res.status(201).json({
            name:available.name,
            _id:available._id,
            email:available.email,
            isAdmin:available.isAdmin,
            pic:available.pic,
            token:generateToken(available._id)
        })
    }else{
        res.status(400)
        throw new Error("Incorrect email or password")
    }
})
const updateUser =asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.pic = req.body.pic || user.pic
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({
            _id:updatedUser._id,
            email:updatedUser.email,
            name:updatedUser.name,
            pic:updatedUser.pic,
            token:generateToken(updatedUser._id)
        })

    }
    else{
        res.status(404)
        throw new Error('User not found')
    }

})
module.exports = {registerUser,authUser,updateUser}