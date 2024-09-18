const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Readable } = require('stream');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();  // Make sure to load environment variables

const post = require('../models/post');
const verify = require('../routers/verification');

// Configure Cloudinary
cloudinary.config({
    cloud_name: "dsa0alsnp",
    api_key: "239662399475921",
    api_secret: "LmPV7tkvr3kSbHqVapkYYHbgnH4",
});

// Multer setup to handle file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/new', verify, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, error: 'No file uploaded' });

        // Upload image to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ success: false, error: 'Cloudinary upload failed' });
            }

            // Save image metadata to MongoDB
            try {
                const post = new Post({
                    image: result.secure_url,
                    cloudinary_id: result.public_id, // Save Cloudinary public_id for future deletions
                    description: req.body.descp,
                    tags: req.body.Tags,
                    user: req.body.user,
                    date: req.body.date
                });
                await post.save();
                res.json({ success: true });
            } catch (err) {
                console.log(err);
                res.json({ success: false, error: 'Error saving post data' });
            }
        });

        // Create a readable stream from the buffer and pipe to Cloudinary
        const bufferStream = new Readable();
        bufferStream.push(req.file.buffer);
        bufferStream.push(null);
        bufferStream.pipe(uploadStream);

    } catch (e) {
        console.log(e);
        res.json({ success: false, error: e.message });
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
