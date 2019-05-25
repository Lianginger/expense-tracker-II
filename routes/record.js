const express = require('express')
const router = express.Router()
const db = require('../models')
const moment = require('moment')
const tz = require('moment-timezone')
const Record = db.Record

// 建立新資料頁面
router.get('/new', (req, res) => {
  const today = moment().tz('Asia/Taipei').format('YYYY-MM-DD')
  res.render('new', { today })
})


// 建立新資料
router.post('/new', (req, res) => {
  const newRecord = req.body
  console.log(req.user)
  console.log(req.user.id)
  newRecord.UserId = req.user.id
  console.log(newRecord)
  Record.create(newRecord)
    .then(
      res.redirect('/')
    )
})

// 編輯特定資料頁面
router.get('/:id/edit', (req, res) => {
  res.send('編輯特定資料頁面')
})

// 編輯特定資料
router.put('/:id/edit', (req, res) => {
  res.send('編輯特定資料')
})

// 刪除特定資料
router.delete('/:id/', (req, res) => {
  res.send('刪除特定資料')
})

module.exports = router