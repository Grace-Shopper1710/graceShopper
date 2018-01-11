
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Products routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})

describe('GET api/products', () => {


    it('responds with an array via JSON that is empty', () => {
      return request(app)
      .get('/api/products')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an.instanceOf(Array)
        expect(res.body).to.have.length(0)
      })
    })

    it('returns a product if there is one in the DB', () => {

      let beer = Product.build({
        name: `Sample beer 1`
      })

      return beer.save().then(() => {
        return request(app)
        .get('/api/products')
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.an.instanceOf(Array)
          expect(res.body[0].name).to.equal(`Sample beer 1`)
        })

      })

    })


    it('returns another beer if there in another one in the DB', () => {
      let beerII = Product.build({
        name: `Sample beer 2`
      })

      return beerII.save().then(() => {
        return request(app)
        .get('/api/products')
        .expect(res => {
          expect(res.body).to.be.an.instanceOf(Array)
          expect(res.body[0].name).to.equal(`Sample beer 1`)
          expect(res.body[1].name).to.equal(`Sample beer 2`)
        })
      })
    })
  })


  describe('GET /products/:productId', () => {
    let beer

    before(() => {
      beer = Product.build({
        name: 'Sample Brew'
      })


      return beer.save()
    })

    it('retrieve a single product based on the id', () => {
      return request(app)
      .get(`/api/breweries/${beer.id}`)
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an('object')
      })
    })
  })

// it('should retrieve a single product with route GET /api/products/:productId', () => {
//   return request(app)
//   .get('/api/product/:productId')
//   .expect(200)
//   .then(res => {
//     expect(res.body).to.be.an('object')
//   })
// })

// it('should create a product with route POST /', () => {
//   return request(app)
//   .post('/api/products/')
//   .send({name: `Oprah2020: the beer of the future`})
//   .expect(201)
//   .then(res => {
//     expect('Content-Type', /json/)
//     expect(res.body).to.have.property('name')
//     expect(res.body).to.have.property('image')
//     expect(res.body).to.have.property('inventory')
//     expect(res.body).to.have.property('price')
//     expect(res.body).to.have.property('packaging')
//     expect(res.body).to.have.property('description')
//     expect(res.body).to.have.property('abv')
//     expect(res.body).to.have.property('breweryId')
//     expect(res.body).to.have.property('styleId')
//   })
// })


// it('should update a brewery with route PUT /:productId', () => {
//   return request(app)
//   .put('api/products/:productId')
//   .send({name: 'Sample Beer'})
//   .expect(201)
//   .then(res => {
//     expect(res.body).to.be('json')
//     expect(res.body.name).to.eql('Sample Beer')
//   })
// })


// it('should remove a specific product', () => {
//   return request(app)
//     .delete('/api/products/:productId')
//     .expect(204)
//     .get('/api/products/:productId')
//     .expect(404)
// })

// it('responds with a 404 if a product does not exist', () => {
//   return request(app)
//     .get('/api/products/:5')
//     .expect(404)
//   })
