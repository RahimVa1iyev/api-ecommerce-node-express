const User = require('../models/User')
const { BadRequestError ,UnauthenticatedError } = require('../errors')
const {StatusCodes} = require('http-status-codes')
const { attachCookiesToResponse } = require('../utils')


const login = async (req, res) => {
    const {email,password} = req.body

    if(!email || !password) throw new BadRequestError('Email and password is required field')

    const user = await User.findOne({email})
    if(!user) throw new UnauthenticatedError('User not found')

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect) throw new UnauthenticatedError('User not found')

    const userToken = {name : user.name , userId : user._id, role : user.role}
    attachCookiesToResponse({res,user : userToken})

    res.status(StatusCodes.OK).json({user})

}

const register = async (req, res) => {
    const { name, email, password } = req.body

    const isFirstAccount = (await User.countDocuments({})) === 0
    const role = isFirstAccount ? 'admin' : 'user'

    const user = await User.create({name,email,password,role})

    const userToken = {name : user.name , userId : user._id, role : user.role}
     attachCookiesToResponse({res,user : userToken})

    res.status(StatusCodes.CREATED).json({user:userToken})
}

const logout = async (req, res) => {
    res.send("logout fetch")
}

module.exports = { login, register, logout }