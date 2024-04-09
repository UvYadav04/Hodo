const express = require('express')
const router = express.Router()
const user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const key = "dinesh yadav"


router.post('/', async (req, res) => {
    // console.log("received")
    try {
        let data = req.body
        // console.log(data)
        const { name, username, email, password } = data.userdata;
        // console.log(username)
        const hashed = await bcrypt.hash(password, 10);
        const c = await user.findOne({ Username: username });
        if (c) {
            console.log("already taken")
            res.json({ success: false, message: "username already taken" })
        }
        else if (!c) {
            const c = new user({ Name: name, Email: email, Username: username, Password: hashed })
            await c.save()
                .then(() => {
                    const data =
                    {
                        id: c._id,
                        time: new Date()
                    }
                    // console.log("loging in")
                    const userdata = {
                        name: c.Username,
                        id: c._id
                    }

                    res.cookie("userdata", userdata)
                    jwt.sign(data, key, (err, token) => {
                        if (err) {
                            res.json({ success: false, message: "Invalid credentials" })
                        }
                        // console.log(`authtoken : `, token)
                        res.json({ success: true, token: token })
                    })
                })
                .catch((e) => {
                    console.log(e)
                    res.json({ success: false, message: e })
                })
        }
    }

    catch (e) {
        // console.log(e)
        res.json({ success: false, message: "Something went wrong" })
    }
})

module.exports = router;