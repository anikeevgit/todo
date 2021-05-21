const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user.js')


exports.getLogin = (req, res) => {
    res.render('logins.ejs')
}
exports.getReg = (req, res) => {
    res.render('reg.ejs')
}

exports.postReg = async function(req, res) {
    const candidate = await User.findOne({ username: req.body.username })
    if (candidate) {
        res.json({
            message: 'Такое имя занято'
        })
    } else {
        const salt = bcrypt.genSaltSync(10)

        const password = req.body.password
        const user = new User({
            username: req.body.username,
            password: bcrypt.hashSync(password, salt)
        })
        try {
            await user.save()
            res.status(201).json({
                message: 'Пользователь создан'
            })
        } catch (err) {
            console.log(err)
        }
    }
}

exports.postLogin = async function(req, res) {
    const candidate = await User.findOne({ username: req.body.username })
    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            const token = jwt.sign({
                username: candidate.username,
                userId: candidate._id
            }, 'GaGaGaGa', { expiresIn: '1h' })
            res.cookie('tokenKey', token)
            res.json({
                token: `Bearer ${token}`,
                message: 'Успешно'
            })
            let decoded = jwt.verify(token, 'GaGaGaGa');
            console.log(decoded.username)
            console.log(candidate)
            console.log('Bearer ' + token)
        } else {
            res.json({
                message: 'Пароли не совпадают'
            })
        }
    } else {
        res.json({
            message: 'Пользователь не найден'
        })
    }
}