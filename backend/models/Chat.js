const mongoose = require('mongoose')
const schema = mongoose.Schema

const chatschema = new schema({
    message: {
        type: [schema.Types.ObjectId],
        ref: "messages"
    },
    users: {
        type: [],
    },
    latestmessage: {
        type: schema.Types.ObjectId,
        ref: "messages"
    }
})

const chat = mongoose.model('chat', chatschema);
module.exports = chat