const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order_controller')
const authMiddleware = require('../../middleware/auth')

router.get('/', authMiddleware.userAuthentication, orderController.allOrder)
router.get('/:id', authMiddleware.userAuthentication, orderController.oneOrder)
router.post('/', authMiddleware.userAuthentication, orderController.createOrder)
router.patch('/:id', authMiddleware.userAuthentication, orderController.updateOrder)
router.delete('/:id', authMiddleware.userAuthentication, orderController.deleteOrder)

module.exports = router