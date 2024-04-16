const express = require('express')
const router = express.Router()
const user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const key = process.env.KEY
const cookieParser = require("cookie-parser")
router.use(cookieParser())


router.post('/', async (req, res) => {
    try {
        // console.log("login got it")
        const data = req.body
        const { username, password } = data.logindata
        // console.log(username, password)

        const c = await user.findOne({ Username: username })
        if (!c)
            res.json({ success: false, message: "Invalid credentials" })

        else if (c) {
            let valid = false;
            if (req.body.logindata.jwt && c.Password === password) {
                valid = true;
            }

            else
                valid = await bcrypt.compare(password, c.Password)

            if (valid) {

                const data =
                {
                    id: c._id,
                    time: new Date()
                }

                jwt.sign(data, key, (err, token) => {
                    if (err) {
                        return res.json({ success: false, message: "token problem" })
                    }
                    return res.json({ success: true, token: token, id: c._id })
                })
            }
            else if (!valid) {
                return res.json({ success: false, message: "invalid credentials" })
            }
        }
    }
    catch (e) {
        res.json({ message: "Something went wrong", error: e })
    }
})

module.exports = router;