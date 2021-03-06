const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineItem', {
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = LineItem
