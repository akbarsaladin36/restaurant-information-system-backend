const express = require('express')
const Route = express.Router()
const authRoutes = require('../modules/routes/auth_routes')
const usersRoutes = require('../modules/routes/users_routes')
const productRoutes = require('../modules/routes/product_routes')
const orderRoutes = require('../modules/routes/order_routes')
const paymentRoutes = require('../modules/routes/payment_routes')

Route.use('/auth', authRoutes)
Route.use('/users', usersRoutes)
Route.use('/products', productRoutes)
Route.use('/orders', orderRoutes)
Route.use('/payments', paymentRoutes)

module.exports = Route