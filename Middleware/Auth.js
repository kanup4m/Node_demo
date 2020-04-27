const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        var decoded = jwt.verify(token, 'secret')
        req.userData = decoded
        next()
    }
    catch (err) {
        res.send({
            message: "Auth failed"
        })
    }
}