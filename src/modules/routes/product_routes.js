const express = require('express')
const router = express.Router()
const productController = require('../controllers/product_controller')
const authMiddleware = require('../../middleware/auth')

router.get('/', authMiddleware.userAuthentication, productController.allProduct)
router.get('/:id', authMiddleware.userAuthentication, productController.oneProduct)
router.post('/', authMiddleware.userAuthentication,  authMiddleware.isAdmin, productController.createProduct)
router.patch('/:id', authMiddleware.userAuthentication, authMiddleware.isAdmin, productController.updateProduct)
router.delete('/:id', authMiddleware.userAuthentication, authMiddleware.isAdmin, productController.deleteProduct)


module.exports = router