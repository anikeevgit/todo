const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.cookies.tokenKey
    if (!authHeader) {
        res.json({
            message: 'Token not provided'
        })
    }
    const token = authHeader
    try {
        jwt.verify(token, 'GaGaGaGa')
        next()
    } catch (e) {
        res.json({
            message: 'Invalid token'
        })
    }
}