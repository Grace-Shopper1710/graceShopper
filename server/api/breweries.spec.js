
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Brewery = db.model('brewery')

describe('Breweries routes:', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})

describe('GET api/breweries', () => {


  it('responds with an array via JSON that is empty',() => {
    return request(app)
    .get('/api/breweries')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(res => {
      expect(res.body).to.be.an.instanceOf(Array)
      expect(res.body).to.have.length(0)
    })
  })

  it('returns a brewery if there is one in the DB', () => {

    let brewery = Brewery.build({
      name: `Lyssa's Brew`
    })

    return brewery.save().then(() => {
      return request(app)
      .get('/api/breweries')
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an.instanceOf(Array)
        expect(res.body[0].name).to.equal(`Lyssa's Brew`)
      })

    })

  })



  it('returns another brewery if there in another one in the DB', () => {
    let breweryII = Brewery.build({
      name: 'Lyssa Brew #2'
    })

    return breweryII.save().then(() => {
      return request(app)
      .get('/api/breweries')
      .expect(res => {
        expect(res.body).to.be.an.instanceOf(Array)
        expect(res.body[0].name).to.equal(`Lyssa's Brew`)
        expect(res.body[1].name).to.equal(`Lyssa Brew #2`)
      })
    })
  })
})

describe('GET /breweries/:breweryId', () => {
  let brewery

  before(() => {
    brewery = Brewery.build({
      name: 'Sample Brew'
    })


    return brewery.save()
  })

  it('retrieve a single brewery based on the id', () => {
    return request(app)
    .get(`/api/breweries/${brewery.id}`)
    .expect(200)
    .expect(res => {
      expect(res.body).to.be.an('object')
    })
  })

})


// it('should create a brewery with route POST /', () => {
//   return request(app)
//   .post('/api/breweries/')
//   .send({name: `Lyssa's Brew`})
//   .expect(201)
//   .then(res => {
//     expect(res.body).to.be('json')
//     expect(res.body).to.have.property('name')
//     expect(res.body).to.have.property('image')
//     expect(res.body).to.have.property('description')
//     expect(res.body).to.have.property('established')
//     expect(res.body).to.have.property('city')
//     expect(res.body).to.have.property('state')
//   expect(res.body).to.have.property('country')
//   })
// })


// it('should update a brewery with route PUT /:breweryId', () => {
//   return request(app)
//   .put('api/breweries/:breweryId')
//   .send({name: 'hello, hello'})
//   .expect(201)
//   .then(res => {
//     expect('Content-Type', /json/)
//     expect(res.body.name).to.eql('hello hello')
//   })
// })


// it('should remove a specific brewery', () => {
//   return request(app)
//     .delete('/api/breweries/:breweryId')
//     .expect(204)
//     .get('/api/breweries/:breweryId')
//     .expect(404)
// })

// it('responds with a 404 if a brewery does not exist', () => {
//   return request(app)
//     .get('/api/breweries/:5')
//     .expect(404)
//   })
