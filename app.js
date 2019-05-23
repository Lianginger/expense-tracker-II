const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/expense-tracker-ii', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('MongoDB is connected!!!')
})

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(port, () => {
  console.log(`Express is running on ${port}`)
})