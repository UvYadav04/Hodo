const jwt = require('jsonwebtoken')
const key = "dinesh yadav"


function verify(req, res, next) {
    let token = req.headers['authorisation']
    token = token.split(' ')[1]
    jwt.verify(token, key, (err, valid) => {
        if (err) {
            return res.json({ success: false })
        }
        else if (valid) {
            // console.log(" token verified")
            next()
        }
    })
}

module.exports = verify