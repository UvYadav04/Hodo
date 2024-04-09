const mongoose = require('mongoose')
const schema = mongoose.Schema

const messageschema = new schema({
    Text: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    seen: {
        type: Boolean
    },
    time: {
        type: String
    }
})

const messages = mongoose.model('messages', messageschema);
module.exports = messages