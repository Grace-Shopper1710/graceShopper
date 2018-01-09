const express = require('express');
const router = express.Router();
const models = require('../db/models');
const Brewery = models.Brewery;

module.exports = router;

router.get('/', (req, res, next) => {
    Brewery.findAll({
        include: [{all: true}]
    })
    .then(breweries => res.json(breweries))
    .catch(next)
})

router.get('/:breweryId', (req, res, next) => {
    Brewery.findById(req.params.breweryId,
        {include: [{all: true}]
    })
    .then(brewery => res.json(brewery))
    .catch(next)
})

router.post('/', (req, res, next) => {
    Brewery.create(req.body)
    .then(brewery => res.json(brewery))
    .catch(next)
})

router.put('/:breweryId', (req, res, next) => {
   Brewery.findOne({
        where: {id: req.params.breweryId}
    })
    .then(brewery => brewery.update(req.body))
    .then(brewery => res.json(brewery))
    .catch(next)
})

router.delete('/:breweryId', (req, res, next) => {
    Brewery.destroy({
        where: {id: req.params.breweryId}
    })
    .then(() => res.send("Successful deletion"))
    .catch(next)
})
