const { JWT_SECRET } = require("./config");
const jwt = require('jsonwebtoken')
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const authorization = req.headers.authorization
    const words = authorization.split(" ")
    const jwtToken = words[1]
    
    try {
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET)
        if(decodedValue.username) {
            next()
        } else {
            res.status(403).json({
                message: 'Admin not authenticated'
            })
        }
    } catch(err) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.name
        })
    }
}

module.exports = adminMiddleware;