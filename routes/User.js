const express = require('express')
const userRouter = express.Router()
const {login, createUser} = require('../controllers/User') 

userRouter.route('/login').post(login)
userRouter.route('/create').post(createUser)

module.exports = userRouter