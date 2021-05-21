const express = require('express')
const targetController = require('../controllers/targetController.js')
const passport = require('passport')
const auth = require('../src/auth.js')
const targetRouter = express.Router()

targetRouter.post('/posttarget', targetController.postTarget)
targetRouter.get('/create', auth, targetController.addTarget)
targetRouter.get('/', auth, targetController.getTarget)
targetRouter.post('/delete', targetController.delTarget)
targetRouter.post('/edit', targetController.editTarget)

module.exports = targetRouter