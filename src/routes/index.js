const express = require('express')
const Route = express.Router()
const authRoutes = require('../modules/routes/auth_routes')
const usersRoutes = require('../modules/routes/users_routes')
const productRoutes = require('../modules/routes/product_routes')

Route.use('/auth', authRoutes)
Route.use('/users', usersRoutes)
Route.use('/products', productRoutes)

module.exports = Route