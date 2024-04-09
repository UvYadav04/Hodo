const express = require('express')
const router = express.Router()
const user = require('../models/user')
const verify = require('../routers/verification')

router.put('/new', verify, async (req, res) => {
    try {
        // console.log("new follow")
        // console.log(req.body)
        const { username, owner } = req.body
        await user.findOneAndUpdate({ Username: username }, { $push: { Followers: owner } })
        const first = await user.findOne({ Username: username })
        await user.findOneAndUpdate({ Username: owner }, { $push: { Following: username } })
        const second = await user.findOne({ Username: owner })

        // console.log(first.friends)
        if (first.Following.includes(owner) && !second.friends.includes(first._id)) {
            await user.findOneAndUpdate({ Username: owner }, { $push: { friends: first._id } })
            await user.findOneAndUpdate({ Username: username }, { $push: { friends: second._id } })
        }
        res.json({ success: true })
    }

    catch {
        res.json({ success: false })
    }

})
router.put('/following', verify, async (req, res) => {
    try {
        // console.log("following")
        const { username, owner } = req.body
        await user.findOneAndUpdate({ Username: username }, { $pull: { Followers: owner } })
        const first = await user.findOne({ Username: username })
        await user.findOneAndUpdate({ Username: owner }, { $pull: { Following: username } })
        const second = await user.findOne({ Username: owner })
        // console.log(`first and second : `, first, second)
        res.json({ success: true })
    }
    catch {
        res.json({ success: false })
    }

})
router.put('/newfollower', verify, async (req, res) => {
    try {
        const { username, owner } = req.body
        const follower = await user.findOne({ Username: username })
        const main = await user.findOne({ Username: owner })

        // let r = await first.find({ friend: { $in: [second._id] } })
        if (main.Following.includes(username) && !main.friends.includes(username)) {
            await user.findOneAndUpdate({ Username: owner }, { $push: { friends: follower._id } })
        }
        res.json({ success: true })
    }
    catch (e) {
        res.json({ success: false, error: e })
    }

})

router.put('/removefollower', async (req, res) => {
    try {
        const { item, owner } = req.body

        await user.findOneAndUpdate({ Username: owner }, { $pull: { Followers: item } })
        const t = await user.findOne({ Username: owner })
        res.json({ success: true, user: t })
    }
    catch (e) {
        console.log(e)
        res.json({ success: false })
    }
})


module.exports = router