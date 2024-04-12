const mongoose = require('mongoose')
const schema = mongoose.Schema

const userschema = new schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: schema.Types.Mixed,
        required: true
    },
    About: {
        type: String,
    },
    Likes: {
        type: Array
    },
    Followers: {
        type: Array
    },
    Following: {
        type: Array
    },
    image: {
        type: String,
        default: ""
    },
    friends: {
        type: [schema.Types.ObjectId],
        ref: 'user'
    },
    Interest: {
        type: []
    },
    Location: {
        type: Object
    }
})

const user = mongoose.model('user', userschema);
module.exports = user