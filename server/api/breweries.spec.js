
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Brewery = db.model('brewery')

describe('Breweries routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})

describe('api/breweries', () => {

  beforeEach(() => {
    return Brewery.create({
      name: 'sampleBrew'
    })
  })

  it('should get all breweries with route: GET /api/breweries/', () => {
    return request(app)
    .get('/api/breweries')
    .expect(200)
    .then(res => {
      expect(res.body).to.be.an('array')
    })
  })
})

it('should retrieve a single brewery with route GET /api/breweries/:breweryId', () => {
  return request(app)
  .get('/api/breweries/:breweryId')
  .expect(200)
  .then(res => {
    expect(res.body).to.be.an('object')
  })
})

it('should create a brewery with route POST /', () => {
  return request(app)
  .post('/api/breweries/')
  .send({name: `Lyssa's Brew`})
  .expect(201)
  .then(res => {
    expect(res.body).to.be('json')
    expect(res.body).to.have.property('name')
    expect(res.body).to.have.property('image')
    expect(res.body).to.have.property('description')
    expect(res.body).to.have.property('established')
    expect(res.body).to.have.property('city')
    expect(res.body).to.have.property('state')
  expect(res.body).to.have.property('country')
  })
})


it('should update a brewery with route PUT /:breweryId', () => {
  return request(app)
  .put('api/breweries/:breweryId')
  .send({name: 'hello, hello'})
  .expect(201)
  .then(res => {
    expect('Content-Type', /json/)
    expect(res.body.name).to.eql('hello hello')
  })
})


it('should remove a specific brewery', () => {
  return request(app)
    .delete('/api/breweries/:breweryId')
    .expect(204)
    .get('/api/breweries/:breweryId')
    .expect(404)
})

it('responds with a 404 if a brewery does not exist', () => {
  return request(app)
    .get('/api/breweries/:yourMama')
    .expect(404)
  })
