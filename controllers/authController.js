const User = require('../models/User')


const login = async (req,res) =>{
    res.send("login fetch")
}

const register = async (req,res) =>{
    res.send("register fetch")
}

const logout = async (req,res) =>{
    res.send("logout fetch")
}

module.exports = {login,register,logout}