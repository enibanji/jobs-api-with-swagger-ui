const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors/index')
const User = require('../models/User')

const authenticationMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid')        
    }

    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        const  {userID,name} = payload
        req.user = {userID,name}
        next()
        
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid')
    }

    
}

module.exports = authenticationMiddleware