const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/payment_controller')
const authMiddleware = require('../../middleware/auth')

router.get('/', authMiddleware.userAuthentication, paymentController.allPayment)
router.get('/my-payments', authMiddleware.userAuthentication, paymentController.myPayment)
router.get('/:id', authMiddleware.userAuthentication, paymentController.onePayment)
router.post('/create', authMiddleware.userAuthentication, paymentController.createPayment)
router.patch('/:id', authMiddleware.userAuthentication, authMiddleware.isStaff, paymentController.verifyPayment)
router.delete('/:id', authMiddleware.userAuthentication, authMiddleware.isAdmin,paymentController.deletePayment)

module.exports = router