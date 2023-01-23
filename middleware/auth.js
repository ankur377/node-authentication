const jwt = require('jsonwebtoken');
jwtkey = "jwt"

module.exports = {
    verifytoken(req, res, next) {
        const bearerHeader = req.headers['authorization'];

        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ')
            // console.warn(bearer[1])
            req.token = bearer[1]
            jwt.verify(req.token, jwtkey, (err, authData) => {
                if (err) {
                    res.json({ ressult: err })
                }
                else {
                    next();
                }
            })
        }
        else {
            res.send({ "result": "Token not provide" })
        }
    }

}