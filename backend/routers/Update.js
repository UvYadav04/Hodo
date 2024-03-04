const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer');
const post = require('../models/post')
const verify = require('../routers/verification')


router.put('/like', verify, async (req, res) => {
    try {
        // console.log("like")
        const id = req.body.id
        const liker = req.body.user
        // console.log(req.body)
        const r = await post.findByIdAndUpdate(id, { $push: { likes: liker } })
        const p = await post.findOne({ _id: id })
        // console.log(p)
        res.json({ success: true, data: { p } })
    }
    catch (e) {
        console.log(`error : `, e)
        res.json({ success: false })
    }
})

router.put('/unlike', verify, async (req, res) => {
    try {
        // console.log("unlike")
        const id = req.body.id
        const liker = req.body.user
        // console.log(liker)
        const r = await post.findByIdAndUpdate(id, { $pull: { likes: liker } })
        const q = await post.findOne({ _id: id });
        // console.log(q)
        res.json({ success: true, data: { q } })
    }
    catch (e) {
        console.log(`error : `, e)
        res.json({ success: false })
    }
})


router.put('/comment/add', async (req, res) => {
    try {
        const id = req.body.id
        const comment = req.body.newcomment
        const username = req.body.user
        const p = await post.findOne({ _id: id });
        const cmnt = p.comment
        let u = cmnt.users
        u = [...u, username]
        let c = cmnt.comment
        c = [...c, comment]
        console.log(u)
        let Comments = {
            users: u,
            comment: c
        }
        const r = await post.findByIdAndUpdate(id, { comment: Comments })
        const q = await post.findOne({ _id: id })
        res.json({ success: true, data: { q } })
    }
    catch (e) {
        console.log(`error : `, e)
        res.json({ success: false })
    }
})

module.exports = router