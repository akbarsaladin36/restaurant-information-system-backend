const express = require('express')
const router = express.Router()
const messageController = require('../controllers/message_controller')
const authMiddleware = require('../../middleware/auth')

router.get('/', authMiddleware.userAuthentication, messageController.allMessage)
router.get('/:id', authMiddleware.userAuthentication, messageController.oneMessage)
router.post('/', authMiddleware.userAuthentication, messageController.createMessage)
router.patch('/:id', authMiddleware.userAuthentication, messageController.updateMessage)
router.delete('/:id', authMiddleware.userAuthentication, messageController.deleteMessage)

module.exports = router