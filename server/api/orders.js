const express = require('express')
const router = express.Router()
const models = require('../db/models')
const Order = models.Order

module.exports = router;

router.get('/', (req, res, next) => {
    Order.findAll({
        include: [{all: true}]
    })
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId,
        {include: [{all: true}]
    })
    .then(order => res.json(order))
    .catch(next)
})

router.post('/', (req, res, next) => {
    Order.create(req.body)
    .then(order => res.json(order))
    .catch(next)
})

router.put('/:orderId', (req, res, next) => {
    Order.findOne({
        where: {id: req.params.orderId}
    })
    .then(order => order.update(req.body))
    .then(order => res.json(order))
    .catch(next)
})

router.delete('/:orderId', (req, res, next) => {
    Order.destroy({
        where: {id: req.params.orderId}
    })
    .then(() => res.send('Successful deletion'))
    .catch(next)
})
