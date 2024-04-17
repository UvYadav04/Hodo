require('dotenv').config()
const express = require('express')
const app = express();
// app.use(express.urlencoded({ extended: true }));
const path = require('path')
const signuprouter = require('./routers/signup')
const loginrouter = require('./routers/login')
const postrouter = require('./routers/post')
const userrouter = require('./routers/user')
const updater = require('./routers/Update')
const Follow = require('./routers/Follow')
const Chat = require('./routers/Chat')
const Searcher = require('./routers/Searcher')
const forgetrouter = require('./routers/Forget')
const user = require('./models/user')
const cookieParser = require("cookie-parser")
const mongoose = require('mongoose')
const port = process.env.PORT

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(cookieParser())
app.use((err, req, res, next) => {
    console.error('Error parsing cookies:', err);
    next(err);
});

var activeusers = new Set()

const http = require("http")
const { Server } = require('socket.io')
const cors = require('cors')
const server = http.createServer(app)


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("connected to mongo")
    })
    .catch((e) => {
        console.log("error : ", e)
    })


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://hodoofficial.onrender.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,Accept,X-Requested-With, Content-Type,authorisation');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.use(cors())
app.use(express.json());
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})
app.use('/user', userrouter)
app.use('/register/signup', signuprouter)
app.use('/register/login', loginrouter)
app.use('/post', postrouter)
app.use('/update', updater)
app.use('/follow', Follow)
app.use('/search', Searcher)
app.use('/chat', Chat)
app.use('/forgetpassword', forgetrouter)
app.get('/activeuser', (req, res) => {
    try {
        let users = []
        activeusers.forEach(item => users.push(item))
        res.json({ success: true, active: users })
    }
    catch {
        res.json({ success: false })
    }
})

app.get('*', (req, res) => {
    res.redirect(`https://hodoofficial.onrender.com`)
})

// ************ server *************



const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
    cookie: true
})

io.use((socket, next) => {
    // Access the HTTP request object associated with the WebSocket connection
    const req = socket.request;

    // Parse cookies from the HTTP request object
    cookieParser()(req, null, () => {
        // Pass the parsed cookies to the next middleware
        next();
    });
});


io.on("connection", async (socket) => {
    // console.log(`user connected  : `, socket.id)

    socket.on("setup", (data) => {
        // console.log(`setup of ${data.username} with id : `, socket.id)
        socket.join(data.username)
        activeusers.add(data.username)
        // console.log(activeusers)
    })

    socket.on("message", (data) => {
        socket.in(data.username).emit("receive", { message: data.message, from: data.owner })
    })


    socket.on("newfollow", (data) => {
        socket.in(data.user).emit("follower", { message: `${data.owner} started following you`, follower: data.owner })
    })

    socket.on("messagereceived", (data) => {
        socket.in(data.username).emit("sent", { owner: data.owner })
    })

    socket.on("disconnecting", (reason) => {
        // console.log(activeusers)
        socket.rooms.forEach(room => {
            if (room !== socket.id) {
                socket.leave(room)
                activeusers.delete(room)
            }
        });
        // console.log(socket.rooms)
        // console.log(activeusers)
        // console.log("disconnecting")
    })
    socket.on("disconnect", (reason) => {
        // console.log("disconnected")
    })
})

server.listen(port, () => {
    console.log("server is running")
})