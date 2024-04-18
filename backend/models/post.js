const mongoose = require('mongoose')
const schema = mongoose.Schema

const postschema = new schema({
    image: {
<<<<<<< HEAD
        type: String,
    },
=======
        type: String    },
>>>>>>> 8d64a29bca6339df645143453be34fd1652e3ef4
    description: {
        type: String,
        required: true
    },
    Tags: {
        type: Object,
        required: true
    },
    likes: {
        type: Array
    },
    comment: {
        users: {
            type: Array
        },
        comment: {
            type: Array
        }
    },
    share: {
        type: Array
    },
    user: {
        type: String
    },
    Date: {
        type: String,
        default: new Date().getTime()
    }
})

const post = mongoose.model('post', postschema);
module.exports = post
