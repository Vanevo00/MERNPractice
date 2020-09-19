const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const keys = require('../config/keys')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwtSecret
}

module.exports = passport => {
  passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const foundUser = await User.findById(jwtPayload.id)
      if (foundUser) return done(null, foundUser)
      return done(null, false)
    } catch(err) {
      console.error(err)
    }
  }))
}
