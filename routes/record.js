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
  newRecord.UserId = req.user.id
  Record.create(newRecord)
    .then(
      res.redirect('/')
    )
})

// 編輯特定資料頁面
router.get('/:id/edit', (req, res) => {
  Record.findOne({ where: { id: req.params.id, userId: req.user.id } })
    .then(record => {
      res.render('edit', { record })
    })
})

// 編輯特定資料
router.put('/:id/edit', (req, res) => {
  Record.findOne({ where: { id: req.params.id, userId: req.user.id } })
    .then(record => {
      Object.assign(record, req.body)
      record.save()
    })
    .then(
      res.redirect('/')
    )
})

// 刪除特定資料
router.delete('/:id/', (req, res) => {
  Record.destroy({ where: { id: req.params.id, userId: req.user.id } })
    .then(
      res.redirect('/')
    )
})

module.exports = router