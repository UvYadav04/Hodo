const express = require('express')
const router = express.Router()
const user = require('../models/user')

const verify = require('../routers/verification')

router.post('/userdata', verify, async (req, res) => {
    try {
        const username = req.body.username
        const t = await user.findOne({ Username: username })
        if (t) {
            res.json({ success: true, user: t, password: t.Password })
        }
        else if (!t) {
            res.json({ success: false, message: "invalid credentials" })
        }
    }
    catch (e) {
        res.json({ success: false })
    }
})

module.exports = router