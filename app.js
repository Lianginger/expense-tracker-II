const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const passport = require('passport')
const db = require('./models')

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
// 設定 method-override
app.use(methodOverride('_method'))

// 使用 Passport
app.use(passport.initialize())
app.use(passport.session())
// 載入 Passport config
require('./config/passport')

app.use('/users', require('./routes/user'))
app.use('/', require('./routes/home'))
app.use('/records', require('./routes/record'))

app.listen(port, () => {
  console.log(`Express is running on ${port}`)
})