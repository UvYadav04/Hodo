const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const post = require('../models/post');
const verify = require('../routers/verification');

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

router.post('/new', verify, upload.single('file'), async (req, res) => {
    try {
        // Cloudinary will provide the full image URL in req.file.path
        const p = new post({
            image: req.file.path, // Store the Cloudinary image URL
            description: req.body.descp,
            Tags: req.body.Tags,
            user: req.body.user,
            Date: req.body.date,
        });

        await p.save();
        res.json({ success: true, imageUrl: req.file.path });
    } catch (e) {
        console.log(e);
        res.json({ success: false, error: e });
    }
});


router.post('/getpostdata', verify, async (req, res) => {
    try {
        const data = await post.find({})
        res.json({ data: data, success: true })
    }
    catch {
        res.json({ success: false })
    }
})

router.post('/getuserdata', verify, async (req, res) => {
    try {
        // console.log("in post")
        const username = req.body.username
        // console.log(username)
        const data = await post.find({ user: username })
        // console.log(data)
        res.json({ data: data })
    }
    catch (e) {
        console.log(`error : `, e);
        res.json({ success: false })
    }
})

module.exports = router;
