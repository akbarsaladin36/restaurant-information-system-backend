const helper = require('../../helpers/helper')
const messageModel = require('../models/Message')

module.exports = {
    allMessage: async (req, res) => {
        try {
            const result = await messageModel.find()
            if(!result.length) {
                return helper.response(res, 400, 'All message data is not found. Please create a new one message!', null)
            } else {
                return helper.response(res, 200, 'All message data is succesfully appeared!', result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    ownMessage: async (req, res) => {
        try {
            const userId = req.decodeToken._id
            const result = await messageModel.find({ receiver_id: userId })
            if(!result) {
                return helper.response(res, 400, `All messages for buyer id ${userId} is empty!`, null)
            } else {
                return helper.response(res, 200, `All messages for buyer id ${userId} is succesfully appeared!`, result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    oneMessage: async (req, res) => {
        try {
            const { id } = req.params
            const result = await messageModel.findOne({ _id: id })
            if(!result) {
                return helper.response(res, 400, `the message data with id ${id} is not found, Please try again!`, null)
            } else {
                return helper.response(res, 200, `the message data with id ${id} is succesfully appeared!`, result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    createMessage: async (req, res) => {
        try {
            const { messageTitle, messageDesc, receiverId } = req.body
            const newMessage = new messageModel({
                message_title: messageTitle,
                message_desc: messageDesc,
                sender_id: req.decodeToken._id,
                sender_role: req.decodeToken.roles,
                receiver_id: receiverId,
                message_status: 'sent'
            })
            const result = await newMessage.save()
            return helper.response(res, 200, `Your message has been sent to ${receiverId}!`, result)
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    updateMessage: async (req, res) => {
        try {
            const { id } = req.params
            const { messageTitle, messageDesc } = req.body
            const checkMessage = await messageModel.findOne({ _id: id })
            if(!checkMessage) {
                return helper.response(res, 400, `The message data with id ${id} is not found! Please try again!`, null)
            } else {
                const setData = {
                    message_title: messageTitle,
                    message_desc: messageDesc
                }
                const result = await messageModel.findByIdAndUpdate({ _id: id }, setData)
                return helper.response(res, 200, `The message data with id ${id} is succesfully updated!`, result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    deleteMessage: async (req, res) => {
        try {
            const { id } = req.params
            const checkMessage = await messageModel.findOne({ _id: id })
            if(!checkMessage) {
                return helper.response(res, 400, `The message data with id ${id} is not found! Please try again!`, null)
            } else {
                const result = await messageModel.findByIdAndRemove({ _id: id })
                return helper.response(res, 200, `The message data with id ${id} is succesfully deleted!`, result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    }
}