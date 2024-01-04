const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')


const getAllUsers = async (req,res) =>{
    console.log(req.user);
    const users = await User.find({role : 'user'}).select('-password')

    res.status(StatusCodes.OK).json({users})
}

const getUser = async (req,res) =>{
    const user = await User.findOne({_id : req.params.id}).select('-password')

    if(!user) throw new BadRequestError(`User not found by : ${req.params.id}`)
    res.status(StatusCodes.OK).json({user})
}
const getCurrentUser = async (req,res) =>{
    res.status(StatusCodes.OK).json({user : req.user})
}
const updateUser = async (req,res) =>{
    res.send('update user')
}
const updateUserPassword = async (req,res) =>{
    const {currentPassword,newPassword} = req.body
    if(!currentPassword || !newPassword) throw new BadRequestError('Current and new passwords is required')
    
    // const user = req.user
    const user = await User.findOne({_id:req.user.userId})
    const isPasswordCorrect = await user.comparePassword(currentPassword)

    if(!isPasswordCorrect) throw new UnauthenticatedError('Password is not correct')

    user.password = newPassword
    await user.save()

    res.status(StatusCodes.OK).json({msj : 'Password change succesfully'})
}

module.exports = {getAllUsers,getUser,getCurrentUser,updateUser,updateUserPassword}