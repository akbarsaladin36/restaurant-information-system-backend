const helper = require('../../helpers/helper')
const orderModel = require('../models/Order')

module.exports = {
    allOrder: async (req, res) => {
        try {
            const result = await orderModel.find()
            if(!result) {
                return helper.response(res, 400, 'all orders is still empty. Please wait until a buyer order the product!', null)
            } else {
                return helper.response(res, 200, 'all orders is successfully appeared!', result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    oneOrder: async (req, res) => {
        try {
            const { id } = req.params
            const result = await orderModel.findOne({ _id: id })
            if(!result) {
                return helper.response(res, 400, `the order data with id ${id} is not found! Please try again!`, null)
            } else {
                return helper.response(res, 200, `the order data with id ${id} is successfully appeared!`, result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    createOrder: async (req, res) => {
        try {
            const { orderDesc, orderQty } = req.body
            const { productId } = req.query
            const newOrder = new orderModel({
                order_desc: orderDesc,
                order_qty: orderQty,
                buyer_id: req.decodeToken._id,
                product_id: productId,
            })
            const result = await newOrder.save()
            return helper.response(res, 200, 'A new order is succesfully created!, Please wait until our staff processing your order!', result)
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    updateOrder: async (req, res) => {
        try {
            const { id } = req.params
            const { orderDesc, orderQty } = req.body
            const checkOrder = await orderModel.findOne({ _id: id })
            if(!checkOrder) {
                return helper.response(res, 400, `the order data with id ${id} is not found. Please try again!`, null)
            } else {
                const setData = {
                    order_desc: orderDesc,
                    order_qty: orderQty
                }
                const result = await orderModel.findByIdAndUpdate({ _id: id }, setData)
                return helper.response(res, 200, `the order data with id ${id} is successfully updated!`, result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    deleteOrder: async (req, res) => {
        try {
            const { id } = req.params
            const checkOrder = await orderModel.findOne({ _id: id })
            if(!checkOrder) {
                return helper.response(res, 400, `the order data with id ${id} is not found. Please try again!`, null)
            } else {
                const result = await orderModel.findByIdAndRemove({ _id: id })
                return helper.response(res, 200, `the order data with id ${id} is successfully deleted!`, result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    }
}