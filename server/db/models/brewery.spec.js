const {expect} = require('chai')
const db = require('../index')
const Brewery = db.model('brewery')

describe('Brewery model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})
