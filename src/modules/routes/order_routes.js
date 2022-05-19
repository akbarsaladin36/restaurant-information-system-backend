const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order_controller')
const authMiddleware = require('../../middleware/auth')

router.get('/', authMiddleware.userAuthentication, orderController.allOrder)
router.get('/all-order/current-buyer', authMiddleware.userAuthentication, orderController.allOrderByBuyer)
router.get('/all-order/pending', authMiddleware.userAuthentication, orderController.allPendingOrder)
router.get('/all-order/taken', authMiddleware.userAuthentication, orderController.allTakenOrder)
router.get('/all-order/delivered', authMiddleware.userAuthentication, orderController.allDeliveredOrder)
router.get('/:id', authMiddleware.userAuthentication, orderController.oneOrder)
router.post('/create/:productId', authMiddleware.userAuthentication, orderController.createOrder)
router.patch('/:id', authMiddleware.userAuthentication, orderController.updateOrder)
router.delete('/:id', authMiddleware.userAuthentication, orderController.deleteOrder)

module.exports = router