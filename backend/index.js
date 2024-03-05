const express = require('express')
const app = express();
const signuprouter = require('./routers/signup')
const loginrouter = require('./routers/login')
const postrouter = require('./routers/post')
const userrouter = require('./routers/user')
const updater = require('./routers/Update')
const Follow = require('./routers/Follow')
const cors = require('cors')
const path = require('path')
var jwt = require('jsonwebtoken');

const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/hodo")
    .then(() => {
        console.log("connected to mongo")
    })
    .catch((e) => {
        console.log("error : ", e)
    })

app.get('/', (req, res) => {
    res.send("home")
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
        "Access-Control-ALlow-Headers",
        "Origin,X-Requested-With,Content-type,Accept"
    );
    next();
})

app.use(cors())
app.use(express.json());
app.use(express.static('public'))


app.use('/user', userrouter)
app.use('/register/signup', signuprouter)
app.use('/register/login', loginrouter)
app.use('/post', postrouter)
app.use('/update', updater)
app.use('/follow', Follow)

app.listen(8080, (req, res) => {
    console.log("listening on 8080")
})