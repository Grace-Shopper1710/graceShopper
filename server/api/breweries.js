const express = require('express')
const router = express.Router()
const models = require('../db/models')
const Brewery = models.Brewery

module.exports = router;

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        const err = new Error('Not Authorized')
        err.status = 403
        next(err)
    }
}

router.get('/', (req, res, next) => {
    Brewery.findAll()
    .then(breweries => res.json(breweries))
    .catch(next)
})

router.get('/:breweryId', (req, res, next) => {
    Brewery.findById(req.params.breweryId)
    .then(brewery => res.json(brewery))
    .catch(next)
})

router.post('/', isAdmin, (req, res, next) => {
    Brewery.create(req.body)
    .then(brewery => res.json(brewery))
    .catch(next)
})

router.put('/:breweryId', isAdmin, (req, res, next) => {
   Brewery.findOne({
        where: {id: req.params.breweryId}
    })
    .then(brewery => brewery.update(req.body))
    .then(brewery => res.json(brewery))
    .catch(next)
})

router.delete('/:breweryId', isAdmin, (req, res, next) => {
    Brewery.destroy({
        where: {id: req.params.breweryId}
    })
    .then(() => res.send('Successful deletion'))
    .catch(next)
})
