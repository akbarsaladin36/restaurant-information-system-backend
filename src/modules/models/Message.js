const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema (
    {
        message_title: {
            type: String,
            required: true
        },
        message_desc: {
            type: String,
            required: true
        },
        sender_id: {
            type: String,
            required: true
        },
        receiver_id: {
            type: String,
            required: true
        },
        message_status: {
            type: String,
            enum: ['sent', 'received', 'draft', 'trash'],
            default: 'draft'
        }
    },
    {
        timestamps: true
    }
)

const Message = mongoose.model('messages', messageSchema)

module.exports = Message