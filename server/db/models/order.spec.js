
/* global describe beforeEach it */

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
          address: '323 Lalala',
          zipCode: '123',
          city: 'NNNNNN',
          state: 'LALA',
          creditCard: '4343432434fdkjfdklsg',
          creditCardExpDate: '3213fdf'
        })
          .then(order => {
            delivery = order
          })
      })

      it('returns the total cost of all products', () => {
        expect(delivery.total()).to.be.equal(72)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
