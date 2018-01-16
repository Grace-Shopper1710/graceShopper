const express = require('express')
const router = express.Router()
const models = require('../db/models')
const Order = models.Order

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

router.post('/', isAdmin, (req, res, next) => {
    Order.create(req.body)
    .then(order => res.json(order))
    .catch(next)
})

router.put('/:orderId', isAdmin, (req, res, next) => {
  Order.findById(req.params.orderId,
      {include: [{all: true}]
    })
    .then(order => order.update(req.body))
    .then(order => res.json(order))
    .catch(next)
})

router.delete('/:orderId', isAdmin, (req, res, next) => {
    Order.destroy({
        where: {id: req.params.orderId}
    })
    .then(() => res.send('Successful deletion'))
    .catch(next)
})
