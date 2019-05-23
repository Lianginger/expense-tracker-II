const express = require('express')
const router = express.Router()
const db = require('../models')
const User = db.User
const bcrypt = require('bcryptjs')

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
  const { name, email, password, password2 } = req.body
  // 加入錯誤訊息提示
  let errors = []
  if (!name || !email || !password || !password2) {
    errors.push({ message: '所有欄位都是必填' })
  }
  if (password !== password2) {
    errors.push({ message: '密碼輸入錯誤' })
  }
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    })
  } else {
    User.findOne({ where: { email } }).then(user => {
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了' })
        res.render('register', { errors, name, email, password, password2 })
      } else {

      }
    })
  }
  // User.create({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password
  // }).then(res.redirect('/'))
})

// 登出
router.get('/logout', (req, res) => {

})

module.exports = router