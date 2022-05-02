const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema (
    {
        order_desc: {
            type: String,
            required: true
        },
        order_qty: {
            type: String,
            required: true
        },
        buyer_id: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        product_id: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
    },
    {
        timestamps: true
    }
)

const Order = mongoose.model('orders', orderSchema)

module.exports = Order