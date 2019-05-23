const express = require('express')
const router = express.Router()
const db = require('../models')
const User = db.User

// 登入頁面
router.get('/login', (req, res) => {

})

// 登入檢查
router.post('/login',

)

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊檢查
router.post('/register', (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).then(res.redirect('/'))
})

// 登出
router.get('/logout', (req, res) => {

})

module.exports = router