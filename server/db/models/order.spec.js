const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('totalCost', () => {
      let delivery

      beforeEach(() => {
        return Order.create({
          firstName: 'Julia',
          lastName: 'Jaspers',
          products: [{id: 1, price: 12.50, quantity: 4}, {id: 2, price: 11.00, quantity: 2}],
          address: '123 Wall St.',
          zipCode: '11223',
          city: 'New York',
          state: 'NY',
          creditCard: '434343243443434343434',
          creditCardExpDate: '03/20'
        })
          .then(order => {
            delivery = order
          })
      })

      xit('returns the total cost of all products', () => {
        expect(delivery.total()).to.be.equal(72)
      })
    })
  })
})

