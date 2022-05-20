const helper = require('../../helpers/helper')
const orderModel = require('../models/Order')
const productModel = require('../models/Product')

module.exports = {
    allOrder: async (req, res) => {
        try {
            const result = await orderModel.find()
            if(!result.length) {
                return helper.response(res, 400, 'all orders is still empty. Please wait until a buyer order the product!', null)
            } else {
                return helper.response(res, 200, 'all orders is successfully appeared!', result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    allOrderByBuyer: async (req, res) => {
        try {
            const userId = req.decodeToken._id
            const result = await orderModel.find({ buyer_id: userId })
            if(!result.length) {
                return helper.response(res, 400, `all orders for buyer id ${userId} is not found!`, null)
            } else {
                return helper.response(res, 200, `all orders for buyer id ${userId} is succesfully appeared!`, result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    allPendingOrder: async (req, res) => {
        try {
            const result = await orderModel.find({ order_status: 'pending' })
            if(!result.length) {
                return helper.response(res, 400, 'all pending order is not found. Please create a new order!', null)
            } else {
                return helper.response(res, 200, 'All pending order is succesfully appeared!', result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    allTakenOrder: async (req, res) => {
        try {
            const result = await orderModel.find({ order_status: 'taken' })
            if(!result.length) {
                return helper.response(res, 400, 'all taken order is not found. Please create a new order!', null)
            } else {
                return helper.response(res, 200, 'All taken order is succesfully appeared!', result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    allDeliveredOrder: async (req, res) => {
        try {
            const result = await orderModel.find({ order_status: 'delivered' })
            if(!result.length) {
                return helper.response(res, 400, 'all delivered order is not found. Please create a new order!', null)
            } else {
                return helper.response(res, 200, 'All delivered order is succesfully appeared!', result)
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
            const { productId } = req.params
            const { orderDesc, orderQty } = req.body
            const checkProduct = await productModel.findOne({ _id: productId })
            if(!checkProduct) {
                return helper.response(res, 400, `An order cannot be created because the product id ${productId} data is not found!`, null)
            }
            const totalOrderAmount = orderQty * checkProduct.product_price
            const newOrder = new orderModel({
                order_desc: orderDesc,
                order_qty: orderQty,
                order_amount: totalOrderAmount,
                buyer_id: req.decodeToken._id,
                product_id: productId,
                order_status: 'pending'
            })
            const result = await newOrder.save()
            return helper.response(res, 200, 'A new order is succesfully created!, Please wait until our staff processing your order!', result)
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    verifyOrderToTaken: async (req, res) => {
        try {
            const { id } = req.params
            const checkOrder = await orderModel.findOne({ _id: id })
            if(!checkOrder) {
                return helper.response(res, 400, `The order data with id ${id} is not found. Please try again!`, null)
            } else {
                const setData = {
                    order_status: 'taken'
                }
                const result = await orderModel.findByIdAndUpdate({ _id: id }, setData)
                return helper.response(res, 200, `The order data with id ${id} is succesfully taken by our chef. Please wait until our staff send your order!`, result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    verifyOrderToDelivered: async (req, res) => {
        try {
            const { id } = req.params
            const checkOrder = await orderModel.findOne({ _id: id })
            if(!checkOrder) {
                return helper.response(res, 400, `The order data with id ${id} is not found. Please try again!`, null)
            } else {
                const setData = {
                    order_status: 'delivered'
                }
                const result = await orderModel.findByIdAndUpdate({ _id: id }, setData)
                return helper.response(res, 200, `The order data with id ${id} is succesfully delivered by our staff!`, result)
            }
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