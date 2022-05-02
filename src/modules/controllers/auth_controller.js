const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../../helpers/helper')
const authModel = require('../models/User')

module.exports = {
    register: async (req, res) => {
        try {
            const { userName, userEmail, userPassword, userRoles } = req.body
            const checkEmail = await authModel.findOne({ email: userEmail })
            if(checkEmail) {
                return helper.response(res, 400, 'Your email is registered on this website. Please try a new email!', null)
            } else {
                const salt = bcrypt.genSaltSync(10)
                const encryptPassword = bcrypt.hashSync(userPassword, salt)
                const newUser = new authModel({
                    username: userName,
                    email: userEmail,
                    password: encryptPassword,
                    roles: userRoles
                 })
                const result = await newUser.save()
                return helper.response(res, 200, 'New user is successfully created!', result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    login: async (req, res) => {
        try {
            const { userEmail, userPassword } = req.body
            const checkEmail = await authModel.findOne({ email: userEmail })
            if(checkEmail) {
                const checkPassword = bcrypt.compareSync(
                    userPassword,
                    checkEmail.password
                )
                if(checkPassword) {
                    const payload = {
                            _id: checkEmail._id,
                            username: checkEmail.username,
                            email: checkEmail.email,
                            roles: checkEmail.roles
                    }
                    const token = jwt.sign({...payload}, process.env.JWT_SECRETKEY, {
                        expiresIn: process.env.JWT_EXPIRESTIME
                    })
                    const result = {...payload, token}
                    return helper.response(res, 200, 'User is successfully logged in!', result)
                } else {
                    return helper.response(res, 400, 'Your password is incorrect! Please try again!', null)
                }
            } else {
                return helper.response(res, 400, 'Your email is incorrect! Please try again!', null)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 400, 'Bad Request', null)
        }
    }
}