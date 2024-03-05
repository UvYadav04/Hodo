const express = require('express')
const router = express.Router()
const user = require('../models/user')
const verify = require('../routers/verification')


router.put('/new', verify, async (req, res) => {
    try {
        console.log("new follow")
        console.log(req.body)
        const { username, owner } = req.body
        await user.findOneAndUpdate({ Username: username }, { $push: { Followers: owner } })
        const first = await user.findOne({ Username: username })
        await user.findOneAndUpdate({ Username: owner }, { $push: { Following: username } })
        const second = await user.findOne({ Username: owner })
        console.log(first)
        console.log(second)

        res.json({ success: true })
    }

    catch {
        res.json({ success: false })
    }

})
router.put('/following', verify, async (req, res) => {
    try {
        console.log("following")
        const { username, owner } = req.body
        await user.findOneAndUpdate({ Username: username }, { $pull: { Followers: owner } })
        const first = await user.findOne({ Username: username })
        await user.findOneAndUpdate({ Username: owner }, { $pull: { Following: username } })
        const second = await user.findOne({ Username: owner })
        console.log(`first and second : `, first, second)
        res.json({ success: true })
    }
    catch {
        res.json({ success: false })
    }

})


module.exports = router