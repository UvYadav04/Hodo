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
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fpng%2F20911740-user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon&psig=AOvVaw1Ii9H0ISBzRamlCROsftiP&ust=1713532777501000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCODJiZbty4UDFQAAAAAdAAAAABAE"
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
