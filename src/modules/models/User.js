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
        },
        status: {
            type: String,
            enum: ['single', 'married', 'divorced', 'widowed'],
            default: 'single'
        },
        gender : {
            type: String,
            enum: ['male', 'female'],
            default: 'male'
        },
        religion: {
            type: String,
            enum: ['islam', 'kristen', 'hindu', 'buddha', 'lainnya'],
            default: 'lainnya'
        },
        roles: {
            type: String,
            enum: ['admin', 'buyer', 'staff'],
            default: 'buyer'
        }
    },
    { 
        timestamps: true
    }
)

const User = mongoose.model('users', userSchema)

module.exports = User

