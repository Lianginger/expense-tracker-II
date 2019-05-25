const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../models')
const User = db.User
const bcrypt = require('bcryptjs')

module.exports = (() => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    function (email, password, done) {
      User.findOne({ where: { email } }).then(user => {
        if (!user) {
          return done(null, false, { message: 'Email 不正確或未註冊' })
        }
        bcrypt.compare(password, user.password, function (err, isMatch) {
          // isMatch === true
          if (err) throw err
          if (isMatch) {
            return done(null, user)
          } else {
            return done(null, false, { message: '密碼不正確' })
          }
        })
      })
    }
  ))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findByPk(id).then(user => {
      done(null, user)
    })
  })
})()
