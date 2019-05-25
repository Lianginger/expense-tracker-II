const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const authenticated = require('./config/auth')
const db = require('./models')

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
// 設定 method-override
app.use(methodOverride('_method'))

// 使用 express session
app.use(session({
  secret: 'secret key',
  resave: 'false',
  saveUninitialized: 'false',
}))

// 使用 Passport
app.use(passport.initialize())
app.use(passport.session())
// 載入 Passport config
require('./config/passport')

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

app.use('/users', require('./routes/user'))
app.use('/', authenticated, require('./routes/home'))
app.use('/records', authenticated, require('./routes/record'))

app.listen(port, () => {
  console.log(`Express is running on ${port}`)
})