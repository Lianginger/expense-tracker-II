const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use('/', require('./routes/home'))
app.use('/records', require('./routes/record'))

app.listen(port, () => {
  console.log(`Express is running on ${port}`)
})