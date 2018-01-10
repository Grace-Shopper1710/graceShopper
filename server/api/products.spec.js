
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('Product')

describe('Breweries routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})

describe('api/products', () => {

  beforeEach(() => {
    return Product.create({
      name: 'itsTheBestest'
    })
  })

  it('should get all products with route: GET /api/products/', () => {
    return request(app)
    .get('/api/products')
    .expect(200)
    .then(res => {
      expect(res.body).to.be.an('array')
    })
  })
})

it('should retrieve a single product with route GET /api/products/:productId', () => {
  return request(app)
  .get('/api/product/:productId')
  .expect(200)
  .then(res => {
    expect(res.body).to.be.an('object')
  })
})

it('should create a product with route POST /', () => {
  return request(app)
  .post('/api/products/')
  .send({name: `Oprah2020: the beer of the future`})
  .expect(201)
  .then(res => {
    expect('Content-Type', /json/)
    expect(res.body).to.have.property('name')
    expect(res.body).to.have.property('image')
    expect(res.body).to.have.property('inventory')
    expect(res.body).to.have.property('price')
    expect(res.body).to.have.property('packaging')
    expect(res.body).to.have.property('description')
    expect(res.body).to.have.property('abv')
    expect(res.body).to.have.property('breweryId')
    expect(res.body).to.have.property('styleId')
  })
})


it('should update a brewery with route PUT /:productId', () => {
  return request(app)
  .put('api/products/:productId')
  .send({name: 'Sample Beer'})
  .expect(201)
  .then(res => {
    expect(res.body).to.be('json')
    expect(res.body.name).to.eql('Sample Beer')
  })
})


it('should remove a specific product', () => {
  return request(app)
    .delete('/api/products/:productId')
    .expect(204)
    .get('/api/products/:productId')
    .expect(404)
})

it('responds with a 404 if a product does not exist', () => {
  return request(app)
    .get('/api/products/:yourMama')
    .expect(404)
  })
