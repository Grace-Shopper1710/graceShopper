const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Style = db.model('style')

describe('Styles routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})

describe('GET api/styles', () => {


    it('responds with an array via JSON that is empty', () => {
      return request(app)
      .get('/api/styles')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an.instanceOf(Array)
        expect(res.body).to.have.length(0)
      })
    })

    it('returns a style if there is one in the DB', () => {

      let style1 = Style.build({
        name: `Fancy IPA`
      })

      return style1.save().then(() => {
        return request(app)
        .get('/api/styles')
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.an.instanceOf(Array)
          expect(res.body[0].name).to.equal(`Fancy IPA`)
        })

      })

    })


    it('returns another style if there in another one in the DB', () => {
      let style2 = Style.build({
        name: `Heavy Lager`
      })

      return style2.save().then(() => {
        return request(app)
        .get('/api/styles')
        .expect(res => {
          expect(res.body).to.be.an.instanceOf(Array)
          expect(res.body[0].name).to.equal(`Fancy IPA`)
          expect(res.body[1].name).to.equal(`Heavy Lager`)
        })
      })
    })
  })


  describe('GET /styles/:styleId', () => {
    let style

    before(() => {
      style = Style.build({
        name: 'Sample Brew'
      })


      return style.save()
    })

    it('retrieve a single product based on the id', () => {
      return request(app)
      .get(`/api/styles/${style.id}`)
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an('object')
      })
    })

    it('returns a 404 if the id does not exist in the db', () => {
      return request(app)
      .get('/api/styles/156254')
      .expect(404);
    })
  })
