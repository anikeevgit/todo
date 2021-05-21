const express = require('express')
const homeController = require('../controllers/homeController.js')
const homeRouter = express.Router()

homeRouter.get('/', homeController.home)
homeRouter.get('/about', homeController.about)

module.exports = homeRouter