const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users_controller')
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/upload')

router.get('/', authMiddleware.userAuthentication, authMiddleware.isAdmin, usersController.allUsers)
router.get('/all-staffs', authMiddleware.userAuthentication, authMiddleware.isAdmin, usersController.allUsersByStaff)
router.get('/all-buyers', authMiddleware.userAuthentication, authMiddleware.isStaff, usersController.allUsersByBuyer)
router.get('/:id', authMiddleware.userAuthentication, usersController.oneUser)
router.post('/', authMiddleware.userAuthentication, authMiddleware.isAdmin, usersController.createUser)
router.patch('/:id', authMiddleware.userAuthentication, uploadFile, usersController.updateOneUser)
router.delete('/:id', authMiddleware.userAuthentication, authMiddleware.isAdmin, usersController.deleteOneUser)


module.exports = router