const express = require('express')
const router = express.Router()
const models = require('../db/models')
const Product = models.Product

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
    .then(product => {
      if (!product) res.sendStatus(404)
      else res.json(product)
    })
    .catch(next)
})

router.post('/', isAdmin, (req, res, next) => {
    Product.create(req.body)
    .then(product => res.json(product))
    .catch(next)
})

router.put('/:productId', isAdmin, (req, res, next) => {
    Product.findOne({
        where: {id: req.params.productId},
        include: {all: true}
    })
    .then(product => product.update(req.body))
    .then(product => res.json(product))
    .catch(next)
})

router.delete('/:productId', isAdmin, (req, res, next) => {
    Product.destroy({
        where: {id: req.params.productId}
    })
    .then(() => res.send('Successful deletion'))
    .catch(next)
})
