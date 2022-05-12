const mongoose = require('mongoose')
const Schema = mongoose.Schema

const paymentSchema = new Schema(
    {
        payment_description : {
            type: String,
            required: true
        },
        payment_type: {
            type: String,
            required: true
        },
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        payment_status: {
            type: String,
            enum: ['paid', 'on-payment', 'failed'],
            default: 'on-payment'
        }
    },
    {
        timestamps: true
    }
)

const Payment = mongoose.model('payments', paymentSchema)

module.exports = Payment