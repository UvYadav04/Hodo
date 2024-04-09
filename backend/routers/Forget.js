const express = require('express')
const router = express.Router()
const user = require('../models/user')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
var generator = require('generate-password')

router.post('/', async (req, res) => {
    try {
        const { fusername } = req.body

        const c = await user.findOne({ Username: fusername })
        if (!c)
            res.json({ success: false, message: "No such user" })

        const newpassword = generator.generate({
            length: 11,
            numbers: true
        })
        let hashedpassword = await bcrypt.hash(newpassword, 10)
        await user.findByIdAndUpdate(c._id, { Password: hashedpassword })
        console.log(newpassword)

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hodo.official11@gmail.com',
                pass: 'cgmb mwdo xaaz quqh'
            }
        });

        var mailOptions = {
            from: 'hodo.official11@gmail.com',
            to: c.Email,
            subject: 'Password reset link',
            text: `your new password is : ${newpassword}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.json({ success: false, message: "Something went wrong" })
                console.log(error);
            } else {
                res.json({ success: true, message: "password sent on your registered email id" })
                console.log('Email sent: ' + info.response);
            }
        });

    }

    catch (e) {
        console.log(`error : `, e)
    }
})


module.exports = router