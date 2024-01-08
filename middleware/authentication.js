const {isTokenValid} = require('../utils')
const {UnauthenticatedError, UnauthorizedError} = require('../errors')

const authenticateUser = async(req,res,next) =>{
    const token = req.signedCookies.token
    if(!token) throw new UnauthenticatedError('Authentication invalid')

    try {
        const {payload} = isTokenValid({token})
        req.user = {name :payload.name ,userId :payload.userId, role : payload.role}
        next()
    } catch (error) {   
        throw new UnauthenticatedError('Authentication invalid')
    }
}

const authorizePermissions = (...roles) =>{
    return async (req,res,next) =>{
        const role = req.user.role
        console.log(role);
        if(!roles.includes(role)) throw new UnauthorizedError('Unauthorized to access to route')
        next()
    }
}

module.exports = {authenticateUser,authorizePermissions}