const Sequelize = require('sequelize')
const db = require('../db')

const Reviews = db.define('reviews', {
  id: {
    type: Sequelize.INTEGER,
  },
  content: {
    type: Sequelize.TEXT
  }
})

module.exports = Reviews
