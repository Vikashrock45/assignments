const {JWT_SECRET} = require('./config')
const jwt = require('jsonwebtoken')

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const authorization = req.headers.authorization
    const words = authorization.split(' ')
    const jwtToken = words[1]
    
    try {
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET)
        if(decodedValue.username) {
            next()
        } else {
            res.status(403).json({
                message: 'User not authenticated'
            })
        }
    } catch(err) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

module.exports = userMiddleware;