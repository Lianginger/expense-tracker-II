const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const authenticated = require('./config/auth')
const helpers = require('handlebars-helpers')
const math = helpers.comparison()
const db = require('./models')

// 判別開發環境
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config() // 使用 dotenv 讀取 .env 檔案
}

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
// 設定 method-override
app.use(methodOverride('_method'))

// 提供靜態檔案
app.use(express.static('public'))

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

// 使用 connect-flash
app.use(flash())

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auth'))
app.use('/', authenticated, require('./routes/home'))
app.use('/records', authenticated, require('./routes/record'))

app.listen(port, () => {
  console.log(`Express is running on ${port}`)
})