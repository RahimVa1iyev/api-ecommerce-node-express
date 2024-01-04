const User = require('../models/User')


const getAllUsers = async (req,res) =>{
    res.send('get all users')
}

const getUser = async (req,res) =>{
    res.send('get user')
}
const getCurrentUser = async (req,res) =>{
    res.send('get current user')
}
const updateUser = async (req,res) =>{
    res.send('update user')
}
const updateUserPassword = async (req,res) =>{
    res.send('update user password')
}

module.exports = require(getAllUsers,getUser,getCurrentUser,updateUser,updateUserPassword)