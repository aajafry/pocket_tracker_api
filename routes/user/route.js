const express = require('express'),
    userController = require('../../controllers/user/controller');

const userRoute = express.Router();

userRoute.post('/login', userController.login)
userRoute.post('/register', userController.register)

module.exports = userRoute;
