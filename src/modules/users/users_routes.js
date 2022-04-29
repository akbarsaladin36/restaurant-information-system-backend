const express = require('express')
const router = express.Router()
const usersController = require('./users_controller')
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/upload')

router.get('/', authMiddleware.userAuthentication, usersController.allUsers)
router.get('/:id', authMiddleware.userAuthentication, usersController.oneUser)
router.patch('/:id', authMiddleware.userAuthentication, uploadFile, usersController.updateOneUser)
router.delete('/:id', authMiddleware.userAuthentication, usersController.deleteOneUser)


module.exports = router