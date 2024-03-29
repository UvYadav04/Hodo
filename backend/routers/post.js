const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer');
const post = require('../models/post')
const verify = require('../routers/verification')


const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

router.post('/new', verify, upload.single('file'), async (req, res) => {
    const p = new post({ image: req.file.filename, description: req.body.descp, Tags: req.body.Tags, user: req.body.user })
    await p.save()
        .then(() => console.log("new post uploaded"))
        .catch((e) => console.log("error got : ", e))

})

router.post('/getpostdata', verify, async (req, res) => {
    const data = await post.find({})
    res.json({ data: data, success: true })
})

router.post('/getuserdata', verify, async (req, res) => {
    try {
        console.log("in post")
        const username = req.body.username
        console.log(username)
        const data = await post.find({ user: username })
        console.log(data)
        res.json({ data: data })
    }
    catch (e) {
        console.log(`error : `, e);
        res.json({ success: false })
    }
})

module.exports = router;