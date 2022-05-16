const mongoose = require('mongoose')
const Schema = mongoose.Schema

const paymentSchema = new Schema(
    {
        payment_amount: {
            type: Number,
            required: true
        },
        payment_description : {
            type: String,
        },
        payment_type: {
            type: String,
            enum: ['cash', 'credit-card', 'internet-banking'],
            default: 'cash'
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
            enum: ['paid', 'pending', 'failed'],
            default: 'pending'
        }
    },
    {
        timestamps: true
    }
)

const Payment = mongoose.model('payments', paymentSchema)

module.exports = Payment