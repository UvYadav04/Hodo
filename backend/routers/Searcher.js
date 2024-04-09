const express = require('express')
const router = express.Router()
const user = require('../models/user')
const verify = require('./verification')

router.post('/userdata', async (req, res) => {
    // console.log("getting here")
    try {
        // console.log(req.body)
        const username = req.body.username
        // console.log(username)
        const data = await user.find({ Username: { $regex: username } })
        // console.log(data)
        res.json({ success: true, userdata: data })
    }
    catch (e) {
        console.log(`error in search : `, e)
        res.json({ success: false })
    }
})

module.exports = router