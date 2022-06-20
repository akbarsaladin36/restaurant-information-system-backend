const helper = require('../../helpers/helper')
const productModel = require('../models/Product')
const paymentModel = require('../models/Payment')

module.exports = {
    allPayment: async (req, res) => {
        try {
            const result = await paymentModel.aggregate([
                { 
                $lookup:
                   {
                     from: 'products',
                     localField: 'product_id',
                     foreignField: '_id',
                     as: 'product_detail'
                   },
                },
                {
                $lookup:
                    {
                      from: 'users',
                      localField: 'user_id',
                      foreignField: '_id',
                      as: 'user_detail'
                    },
                }
            ])
            if(!result.length) {
                return helper.response(res, 400, 'all payments data is not found. Please create a first payment if you have visitor!',null)
            } else {
                return helper.response(res, 200, 'all payments is succesfully appeared!', result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    onePayment: async (req, res) => {
        try {
            const { id } = req.params
            const result = await paymentModel.findOne({ _id: id })
            if(!result) {
                return helper.response(res, 400, `Your payment data with id ${id} is not found. Please try again!`, null)
            } else {
                return helper.response(res, 200, `Your payment data with id ${id} is succesfully appeared!`, result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    createPayment: async (req, res) => {
        try {
            const { productId } = req.params
            const { paymentAmount, paymentDesc, paymentType } = req.body
            const checkProduct = await productModel.findOne({ _id: productId })
            if(!checkProduct) {
                return helper.response(res, 400, `A payment is not created because a product with id ${productId} is not found!`, null)
            } else {
                if(paymentAmount < checkProduct.product_price) {
                    return helper.response(res, 400, 'A payment amount is less than a product price that you bought!', null)
                }
                if(paymentAmount > checkProduct.product_price) {
                    const paymentRefund = paymentAmount - checkProduct.product_price
                    const newPayment = new paymentModel({
                        payment_amount: paymentAmount,
                        payment_desc: paymentDesc,
                        payment_type: paymentType,
                        product_id: productId,
                        user_id: req.decodeToken._id,
                        payment_status: 'pending'
                    })
                    const result = await newPayment.save()
                    return helper.response(res, 200, `A new payment is successfully created with payment refund of ${paymentRefund}!`, result)
                }
                const newPayment = new paymentModel({
                    payment_amount: paymentAmount,
                    payment_desc: paymentDesc,
                    payment_type: paymentType,
                    product_id: productId,
                    user_id: req.decodeToken._id,
                    payment_status: 'pending'
                })
                const result = await newPayment.save()
                return helper.response(res, 200, 'A new payment is successfully created!', result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    verifyPayment: async (req, res) => {
        try {
            const { id } = req.params
            const checkPayment = await paymentModel.findOne({ _id: id })
            if(!checkPayment) {
                return helper.response(res, 400, `a payment for id ${id} cannot verified because the data is not found`, null)
            } else {
                const setData = {
                    payment_status: 'paid'
                }
                const result = await paymentModel.findByIdAndUpdate({ _id: id }, setData)
                return helper.response(res, 200, `A payment for id ${id} is succesfully verified!`, result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    deletePayment: async (req, res) => {
        try {
            const { id } = req.params
            const checkPayment = await paymentModel.findOne({ _id: id })
            if(!checkPayment) {
                return helper.response(res, 400, `The payment data with id ${id} is not found. Please try again`, null)
            } else {
                const result = await paymentModel.findByIdAndRemove({ _id: id })
                return helper.response(res, 200, `The payment data with id ${id} is succesfully deleted!`, result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    }
}