const express = require('express')
const postRouter = express.Router()
const {createPost, deletePost} = require('../controllers/Post') 
const AuthMiddleware = require('../middlewares/auth')

postRouter.route('/').post(AuthMiddleware, createPost).delete(AuthMiddleware, deletePost)

module.exports = postRouter