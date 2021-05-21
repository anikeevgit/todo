const User = require('../models/user')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'GaGaGaGa'
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async(payload, done) => {
            try {
                const user = await (await User.findById(payload.userId)).isSelected('username id')
                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (err) {
                console.log(err)
            }
        })
    )
}