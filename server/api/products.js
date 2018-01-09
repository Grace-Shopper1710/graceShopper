const express = require('express');
const router = express.Router();
const models = require('../db/models');
const Product = models.Product;

module.exports = router;

router.get('/', (req, res, next) => {
    Product.findAll({
        include: [{all: true}]
    })
    .then(products => res.json(products))
    .catch(next)
})

router.get('/:productId', (req, res, next) => {
    Product.findById(req.params.productId,
        {include: [{all: true}]
    })
    .then(product => res.json(product))
    .catch(next)
})

router.post('/', (req, res, next) => {
    Product.create(req.body)
    .then(product => res.json(product))
    .catch(next)
})

router.put('/:productId', (req, res, next) => {
    Product.findOne({
        where: {id: req.params.productId}
    })
    .then(product => product.update(req.body))
    .then(product => res.json(product))
    .catch(next)
})

router.delete('/:productId', (req, res, next) => {
    Product.destroy({
        where: {id: req.params.productId}
    })
    .then(() => res.send("Successful deletion"))
    .catch(next)
})
