const Sequelize = require('sequelize')
const db = require('../db')

const Reviews = db.define('reviews', {
  content: {
    type: Sequelize.TEXT,
    validate: {
      isLength: function(value, next) {
        if (value.length >= 100) {
          return next()
        } else {
          throw new Error('Length must be 100 or more characters');
        }
      }
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  }
})

module.exports = Reviews
