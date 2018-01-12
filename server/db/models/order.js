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
  products: {
    type: Sequelize.ARRAY(Sequelize.JSON)
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
  creditCard: {
    type: Sequelize.STRING,
    //allowNull: false
  },
  creditCardExpDate: {
    type: Sequelize.STRING,
    //allowNull: false
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
