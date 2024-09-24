const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer');
const post = require('../models/post')
const verify = require('../routers/verification')
const user = require('../models/user')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

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
        // console.log(u)
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
router.put('/comment/delete', async (req, res) => {
    try {
        const id = req.body.id
        const index = req.body.index
        const comment = req.body.item
        const username = req.body.user
        // console.log(req.body)
        const p = await post.findOne({ _id: id });
        const cmnt = p.comment
        let u = cmnt.users
        u.splice(index, 1)
        let c = cmnt.comment
        c.splice(index, 1)
        // console.log(u)
        let Comments = {
            users: u,
            comment: c
        }
        const r = await post.findByIdAndUpdate(id, { comment: Comments })
        const q = await post.findOne({ _id: id })
        res.json({ success: true, data: q })
    }
    catch (e) {
        console.log(`error : `, e)
        res.json({ success: false })
    }
})

// Configure Cloudinary
cloudinary.config({
    cloud_name: "dsa0alsnp",
    api_key: "239662399475921",
    api_secret: "LmPV7tkvr3kSbHqVapkYYHbgnH4",
});

// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // folder in Cloudinary where files will be stored
        format: async (req, file) => 'png', // You can dynamically set the format if needed
        public_id: (req, file) => 'image_' + Date.now(), // Set a unique public ID
    },
});

const upload = multer({ storage: storage });

router.post('/photo', verify, upload.single('file'), async (req, res) => {
    try {
        // console.log("get here")
        const id = req.body.userid
        // console.log(req.body)
        await user.findByIdAndUpdate(id, { image: req.file.path })
        const c = await user.findById(id);
        if (c) {
            res.json({ success: true, user: c })
        }
        else {
            res.json({ success: false, message: "something went wrong" })
        }

    }
    catch (e) {
        res.json({ success: false, message: "something went wrong" })
    }
})


module.exports = router