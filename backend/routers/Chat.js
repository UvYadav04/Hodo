const express = require('express')
const router = express.Router()
const user = require('../models/user')
const verify = require('../routers/verification')
const messgs = require('../models/message')
const chat = require('../models/Chat')


router.post("/newmessage", async (req, res) => {

    try {
        const { message, sender, receiver } = req.body
        // console.log(req.body)

        const m = new messgs({ Text: message, sender: sender, receiver: receiver, time: new Date(), seen: false })
        await m.save();
        // console.log(m)

        var users = []
        users.push(sender, receiver)
        users = users.sort()
        // console.log(users)

        const c = await chat.findOne({ users: users })
        if (!c) {
            const n = new chat({ users: users, message: m._id, latestmessage: m._id })
            // console.log(n)
            await n.save();
        }
        else {
            await chat.findByIdAndUpdate(c._id, { $push: { message: m._id }, latestmessage: m._id })
        }
        res.json({ success: true, message: m })
    }

    catch (e) {
        // console.log(e)
        res.json({ success: false })
    }
})



router.post('/fetchchats', async (req, res) => {
    try {
        const { user, owner } = req.body
        // console.log(req.body)

        var users = [user, owner]
        users = users.sort()

        const chats = await chat.findOne({ users: users }).populate('message').exec()
        if (chats) {
            // console.log("meet first")
            res.json({ success: true, data: chats, nochats: false })
        }
        else
            res.json({ success: true, nochats: true })
    }
    catch (e) {
        // console.log(e)
        res.json({ success: false })
    }
})


module.exports = router