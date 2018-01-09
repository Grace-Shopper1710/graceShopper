const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
  shippingAddress: {
      type: Sequelize.STRING,
      allowNull: false
  }
})

module.exports = Orders
