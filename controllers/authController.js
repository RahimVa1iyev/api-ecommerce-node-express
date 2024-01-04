const User = require('../models/User')
const { BadRequestError } = require('../errors')
const {StatusCodes} = require('http-status-codes')
const { use } = require('express/lib/router')
const { createJWT } = require('../utils/jwt')


const login = async (req, res) => {
    res.send("login fetch")
}

const register = async (req, res) => {
    const { name, email, password } = req.body

    const isFirstAccount = (await User.countDocuments({})) === 0
    const role = isFirstAccount ? 'admin' : 'user'

    const user = await User.create({name,email,password,role})
    const userToken = {name : user.name , userId : user._id, role : user.role}
    const token = createJWT({payload:userToken})

    const oneDay = 1000 *60 *60 *24
    res.cookie('token',token,{
        httpOnly :true,
        expires : new Date(Date.now() + oneDay)
    })

    res.status(StatusCodes.CREATED).json({user : {name:user.name , role :user.role } , token })
}

const logout = async (req, res) => {
    res.send("logout fetch")
}

module.exports = { login, register, logout }