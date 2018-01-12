const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zipCode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  total: {
    type: Sequelize.DOUBLE,
    defaultValue: 0
  },
  status: {
    type:   Sequelize.ENUM,
    values: ['CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED']
  },

  //VIRTUALS

  fullName: {
    type: Sequelize.VIRTUAL,
    get () {
      return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName')
    }
  },
  shippingAddress: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.getDataValue('address') + ' ' + this.getDataValue('city') + ' ' + this.getDataValue('state') + this.getDataValue('zipcode')
    }
  }
})

Order.prototype.total = function(){
  let total = 0
  for (let i = 0; i < this.products.length; i++){
    total += (this.products[i].price * this.products[i].quantity)
  }
  return total
}

module.exports = Order
