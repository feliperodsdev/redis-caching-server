const express = require('express')
const userRouter = express.Router()
const {login, createUser, getUserById} = require('../controllers/User') 
const AuthMiddleware = require('../middlewares/auth')

userRouter.route('/login').post(login)
userRouter.route('/create').post(createUser)
userRouter.route('/').get(AuthMiddleware,getUserById)

module.exports = userRouter