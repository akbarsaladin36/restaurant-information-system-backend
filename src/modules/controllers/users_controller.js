const helper = require('../../helpers/helper')
const usersModel = require('../models/User')
const bcrypt = require('bcrypt')
const fs = require('fs')

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
    allUsersByStaff: async (req, res) => {
        try {
            const result = await usersModel.find({ roles: 'staff' })
            if(!result) {
                return helper.response(res, 400, 'No staff that registered in this website, Please make sure your staff is register first!', null)
            } else {
                return helper.response(res, 200, 'All staff is showed successfully!', result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    allUsersByBuyer: async (req, res) => {
        try {
            const result = await usersModel.find({ roles: 'buyer' })
            if(!result) {
                return helper.response(res, 400, 'No buyer that visited in this website, Please make sure your buyer is registered!', null)
            } else {
                return helper.response(res, 200, 'All buyer is showed succesfully!', result)
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
    createUser: async (req, res) => {
        try {
            const { userName, userEmail, userPassword, userRoles } = req.body
            const checkEmail = await usersModel.findOne({ email: userEmail })
            if(checkEmail) {
                return helper.response(res, 400, 'Your email is registered on this website. Please try a new email!', null)
            } else {
                const salt = bcrypt.genSaltSync(10)
                const encryptPassword = bcrypt.hashSync(userPassword, salt)
                const newUser = new usersModel({
                    username: userName,
                    email: userEmail,
                    password: encryptPassword,
                    roles: userRoles
                 })
                const result = await newUser.save()
                return helper.response(res, 200, 'New user is successfully created from admin!', result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    updateOneUser: async (req, res) => {
        try {
            const { id } = req.params
            const { userFirstName, userLastName, userAddress, userPhoneNumber, userStatus, userGender, userReligion } = req.body
            const checkUser = await usersModel.findOne({ _id: id })
            if(!checkUser) {
                return helper.response(res, 400, `A user data with id ${id} is not found! Please try again!`, null)
            } else {
                const setData = {
                    first_name: userFirstName,
                    last_name: userLastName,
                    address: userAddress,
                    phone_number: userPhoneNumber,
                    avatar_image: req.file ? req.file.filename : '',
                    status: userStatus,
                    gender: userGender,
                    religion: userReligion
                }
                if(checkUser) {
                    if(checkUser) {
                        const imageToDelete = checkUser.avatar_image
                        const imageToExist = fs.existsSync(`src/uploads/${imageToDelete}`)

                        if(imageToDelete && imageToExist) {
                            fs.unlink(`src/uploads/${imageToDelete}`, (err) => {
                                if (err) throw err
                            })
                        }
                    }
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
                if(checkUser) {
                    if(checkUser) {
                        const imageToDelete = checkUser.avatar_image
                        const imageToExist = fs.existsSync(`src/uploads/${imageToDelete}`)

                        if(imageToDelete && imageToExist) {
                            fs.unlink(`src/uploads/${imageToDelete}`, (err) => {
                                if (err) throw err
                            })
                        }
                    }
                }
                const result = await usersModel.findOneAndRemove({ _id: id })
                return helper.response(res, 200, `A user data with id ${id} is succesfully deleted!`, result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    }
}