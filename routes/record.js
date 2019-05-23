const express = require('express')
const router = express.Router()

// 建立新資料頁面
router.get('/new', (req, res) => {
  res.send('建立新資料頁面')
})


// 建立新資料
router.post('/new', (req, res) => {
  res.send('建立新資料')
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