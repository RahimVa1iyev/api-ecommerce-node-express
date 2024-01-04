const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')


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
    res.send('get current user')
}
const updateUser = async (req,res) =>{
    res.send('update user')
}
const updateUserPassword = async (req,res) =>{
    res.send('update user passwo')
}

module.exports = {getAllUsers,getUser,getCurrentUser,updateUser,updateUserPassword}