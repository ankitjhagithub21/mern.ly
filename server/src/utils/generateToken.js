const jwt = require('jsonwebtoken')

const jwt_secret = process.env.JWT_SECRET || "any_secret_key"

const generateToken = (userId) => {
    return jwt.sign({userId},jwt_secret,{expiresIn:"1d"})
}

module.exports = generateToken

