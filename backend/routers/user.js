const express = require('express')
const router = express.Router()
const user = require('../models/user')
const bcrypt = require('bcrypt')
const { getJson } = require("serpapi");
const verify = require('../routers/verification')

router.post('/userdata', verify, async (req, res) => {
    try {
        // *****cookie*********
        // console.log(`cookie : `, req.cookies)
        const username = req.body.username
        const t = await user.findOne({ Username: username }).populate('friends').exec()
        if (t) {
            // console.log(t)
            res.json({ success: true, user: t, password: t.Password })
        }
        else if (!t) {
            res.json({ success: false, message: "invalid credentials" })
        }
    }
    catch (e) {
        res.json({ success: false })
    }
})


router.post('/updateprofile', verify, async (req, res) => {
    try {
        // console.log(req.body)
        const { owner, Name, About, Interest } = req.body.newuser
        await user.findOneAndUpdate({ Username: owner }, { Name: Name, About: About, Interest: Interest })
        const usert = await user.findOne({ Username: owner })
        // console.log(usert)
        res.json({ success: true, user: usert })
    }

    catch (e) {
        console.log(e)
        res.json({ success: false })
    }
})


router.post('/getlocation', verify, async (req, res) => {
    try {
        const { longitude, latitude, owner } = req.body
        // console.log(longitude, latitude)

        const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=3b3ac69a3581477699e82784e886b60e`)
        const json = await response.json()
        // console.log(json)
        // console.log(json.results[0].datasource)
        await user.findOneAndUpdate({ Username: owner }, { Location: json.results[0] })
        res.json({ success: true, data: json.results[0] })
    }

    catch (e) {
        console.log(e)
        res.json({ success: false })
    }
})

function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}

router.post('/getnears', verify, async (req, res) => {
    try {
        const { actives, longitude, latitude, owner } = req.body

        var store = []

        // console.log(store)
        let promises = actives.map((item) => {
            if (item !== owner) {
                return user.findOne({ Username: item }).then((result) => {

                    if (result.Location) {
                        const { lon, lat } = result.Location
                        const dis = calcCrow(latitude, longitude, lat, lon).toFixed(1)
                        store.push([result.Username, result.image, dis]);

                    }
                }).catch((E) => {
                    console.log(E)
                })
            }
        })

        Promise.all(promises).then(() => {
            // console.log(`store: `, store)
            res.json({ success: true, data: store })
        }).catch((e) => {
            console.log(`error : `, e)
        })

    }
    catch (e) {
        console.log(e)
        res.json({ succes: false })
    }
})


router.post('/updatepassword', async (req, res) => {
    const { currentp, newp, confp, owner } = req.body

    const t = await user.findOne({ Username: owner })

    let validity = await bcrypt.compare(currentp, t.Password)
    if (!validity)
        res.json({ success: false, message: "Invalid current password" })

    let hashed = await bcrypt.hash(newp, 10);

    await user.findOneAndUpdate({ Username: owner }, { Password: hashed })
    res.json({ success: true })
})

module.exports = router