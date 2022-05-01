const express = require('express')
const Route = express.Router()
const authRoutes = require('../modules/routes/auth_routes')
const usersRoutes = require('../modules/routes/users_routes')

Route.use('/auth', authRoutes)
Route.use('/users', usersRoutes)

module.exports = Route