const express = require('express')
const Route = express.Router()
const authRoutes = require('../modules/auth/auth_routes')
const usersRoutes = require('../modules/users/users_routes')

Route.use('/auth', authRoutes)
Route.use('/users', usersRoutes)

module.exports = Route