const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        first_name: {
            type: String
        },
        last_name: {
            type: String
        },
        address: {
            type: String
        },
        phone_number: {
            type: String
        },
        avatar_image: {
            type: String
        }
    },
    { 
        timestamps: true
    }
)

const User = mongoose.model('users', userSchema)

module.exports = User

