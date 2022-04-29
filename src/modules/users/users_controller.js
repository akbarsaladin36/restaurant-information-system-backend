const helper = require('../../helpers/helper')
const usersModel = require('../auth/auth_model')

module.exports = {
    allUsers: async (req, res) => {
        try {
            const result = await usersModel.find()
            if(!result) {
                return helper.response(res, 400, 'No users that registered in this website. Please make sure your user is registered!', null)
            } else {
                return helper.response(res, 200, 'All users is showed successfully', result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    oneUser: async (req, res) => {
        try {
            const { id } = req.params
            const result = await usersModel.findOne({ _id: id })
            if(!result) {
                return helper.response(res, 400, `A user data with id ${id} is not found! Please try again!`, null)
            } else {
                return helper.response(res, 200, `A user data with id ${id} is successfully appeared!`, result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    updateOneUser: async (req, res) => {
        try {
            const { id } = req.params
            const { userFirstName, userLastName, userAddress, userPhoneNumber } = req.body
            const checkUser = await usersModel.findOne({ _id: id })
            if(!checkUser) {
                return helper.response(res, 400, `A user data with id ${id} is not found! Please try again!`, null)
            } else {
                const setData = {
                    first_name: userFirstName,
                    last_name: userLastName,
                    address: userAddress,
                    phone_number: userPhoneNumber
                }
                const result = await usersModel.findOneAndUpdate({ _id: id }, setData)
                return helper.response(res, 200, `A user data with id ${id} is succesfully updated!`, result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    deleteOneUser: async (req, res) => {
        try {
            const { id } = req.params
            const checkUser = await usersModel.findOne({ _id: id })
            if(!checkUser) {
                return helper.response(res, 400, `A user data with id ${id} is not found! Please try again!`, null)
            } else {
                const result = await usersModel.findOneAndRemove({ _id: id })
                return helper.response(res, 200, `A user data with id ${id} is succesfully deleted!`, result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    }
}