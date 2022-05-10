const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema (
    {
        product_name: {
            type: String,
            required: true
        },
        product_desc: {
            type: String,
            required: true
        },
        product_price: {
            type: Number,
            required: true
        },
        product_qty: {
            type: Number,
            required: true
        },
        product_status: {
            type: String,
            enum: ['available', 'sold', 'coming soon'],
            default: 'available'
        },
        admin_id: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('products', productSchema)

module.exports = Product