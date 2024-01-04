const User = require('../models/User')
const { BadRequestError } = require('../errors')
const {StatusCodes} = require('http-status-codes')


const login = async (req, res) => {
    res.send("login fetch")
}

const register = async (req, res) => {
    const { name, email, password } = req.body

    const isFirstAccount = (await User.countDocuments({})) === 0
    const role = isFirstAccount ? 'admin' : 'user'



    const user = await User.create({name,email,password,role})

    res.status(StatusCodes).json({user})
}

const logout = async (req, res) => {
    res.send("logout fetch")
}

module.exports = { login, register, logout }