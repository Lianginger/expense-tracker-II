const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const filterData = require('../public/data/filterData.json')
const monthArray = filterData.month
const category = filterData.category
const Sequelize = require('sequelize')
const Op = Sequelize.Op


router.get('/', (req, res) => {
  const filterMonth = req.query.filterMonth || ''
  const filterMonthQuery = '2019-' + filterMonth + '%'
  const filterCategory = req.query.filterCategory || ''
  const filterCategoryQuery = '%' + filterCategory
  const categoryChineseName = category[filterCategory]

  Record.findAll({
    where: {
      userId: req.user.id,
      date: { [Op.like]: filterMonthQuery },
      category: { [Op.like]: filterCategoryQuery }
    }
  }).then(records => {
    let totalAmount = 0
    if (records.length > 0) {
      totalAmount = records.map(item => parseInt(item.amount))
        .reduce((accumulator, currentItem) => accumulator + currentItem)
    }
    res.render('home', { records, totalAmount, filterMonth, filterCategory, categoryChineseName, monthArray })
  })
})

module.exports = router