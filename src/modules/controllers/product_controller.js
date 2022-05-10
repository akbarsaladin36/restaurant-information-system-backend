const helper = require('../../helpers/helper')
const productModel = require('../models/Product')

module.exports = {
    allProduct: async (req, res) => {
        try {
            const result = await productModel.find()
            if(!result) {
                return helper.response(res, 400, 'All product is not displayed in restaurant menu. Please create a new one!', null)
            } else {
                return helper.response(res, 200, 'All product in restaurant menu is successfully appeared!', result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    allProductByAvailable: async (req, res) => {
        try {
            const result = await productModel.find({ product_status: 'available' })
            if(!result) {
                return helper.response(res, 400, 'All available product is not displayed in restaurant menu. Please create a new one!', null)
            } else {
                return helper.response(res, 200, 'All available product is successfully appeared!', result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    oneProduct: async (req, res) => {
        try {
            const { id } = req.params
            const result = await productModel.findOne({ _id: id })
            if(!result) {
                return helper.response(res, 400, `the product data with id ${id} is not found! Please try again`, null)
            } else {
                return helper.response(res, 200, `the product data with id ${id} is successfully appeared!`, result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    createProduct: async (req, res) => {
        try {
            const { productName, productDesc, productPrice, productQty } = req.body
            const checkProduct = await productModel.findOne({ product_name: productName })
            if(checkProduct) {
               return helper.response(res, 400, 'the product name have been registered! Please write a different product name!', null) 
            } else {
                const newProduct = new productModel({
                    product_name: productName,
                    product_desc: productDesc,
                    product_price: productPrice,
                    product_qty: productQty,
                    admin_id: req.decodeToken._id
                })
                const result = await newProduct.save()
                return helper.response(res, 200, 'A new product is created succesfully!', result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { id } = req.params
            const { productName, productDesc, productPrice, productQty } = req.body
            const checkProduct = await productModel.findOne({ _id: id })
            if(!checkProduct) {
                return helper.response(res, 400, `A product data with id ${id} is not found! Please try again!`, null)
            } else {
                const setData = {
                    product_name: productName,
                    product_desc: productDesc,
                    product_price: productPrice,
                    product_qty: productQty,
                }
                const result = await productModel.findByIdAndUpdate({ _id: id }, setData)
                return helper.response(res, 200, `A product data with id ${id} is successfully updated`, result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params
            const checkProduct = await productModel.findOne({ _id: id })
            if(!checkProduct) {
                return helper.response(res, 400, `A product data with id ${id} is not found! Please try again!`, null)
            } else {
                const result = await productModel.findByIdAndRemove({ _id: id })
                return helper.response(res, 200, `A product data with id ${id} is successfully deleted!`, result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    }
}