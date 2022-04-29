const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../../helpers/helper')
const User = require('./auth_model')
const authModel = require('./auth_model')

module.exports = {
    register: async (req, res) => {
        try {
            const { userName, userEmail, userPassword } = req.body
            const checkEmail = await User.findOne({ email: userEmail })
            if(checkEmail) {
                return helper.response(res, 400, 'Your email is registered on this website. Please try a new email!', null)
            } else {
                const salt = bcrypt.genSaltSync(10)
                const encryptPassword = bcrypt.hashSync(userPassword, salt)
                const newUser = new User({
                    username: userName,
                    email: userEmail,
                    password: encryptPassword
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
                            username: checkEmail.username,
                            email: checkEmail.email
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