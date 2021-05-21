const express = require('express')
const loginController = require('../controllers/loginController.js')
const loginRouter = express.Router()

loginRouter.get('/', loginController.getLogin)
loginRouter.get('/registration', loginController.getReg)
loginRouter.post('/login', loginController.postLogin)
loginRouter.post('/registration', loginController.postReg)
module.exports = loginRouter