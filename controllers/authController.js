const User = require('../models/User')
const { BadRequestError ,UnauthenticatedError } = require('../errors')
const {StatusCodes} = require('http-status-codes')
const { attachCookiesToResponse, createUserToken } = require('../utils')


const login = async (req, res) => {
    const {email,password} = req.body

    if(!email || !password) throw new BadRequestError('Email and password is required field')

    const user = await User.findOne({email})
    if(!user) throw new UnauthenticatedError('User not found')

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect) throw new UnauthenticatedError('User not found')

    const userToken = createUserToken(user)
    attachCookiesToResponse({res,user : userToken})

    res.status(StatusCodes.OK).json({user})

}

const register = async (req, res) => {
    const { name, email, password,role } = req.body

    const user = await User.create({name,email,password,role})

    const userToken = createUserToken(user)
     attachCookiesToResponse({res,user : userToken})

    res.status(StatusCodes.CREATED).json({user:userToken})
}

const logout = async (req, res) => {
    res.cookie('token','logout',{
        httpOnly:true,
        expires: new Date(Date.now()) 
    })

    res.status(StatusCodes.OK).json({msj: 'User logged out!'})

}

module.exports = { login, register, logout }