const express = require('express')
const router = express.Router()
const models = require('../db/models')
const Style = models.Style

module.exports = router;

router.get('/', (req, res, next) => {
    Style.findAll({
        include: [{all: true}]
    })
    .then(styles => res.json(styles))
    .catch(next)
})

router.get('/:styleId', (req, res, next) => {
    Style.findById(req.params.styleId,
        {include: [{all: true}]
    })
    .then(style => res.json(style))
    .catch(next)
})

router.post('/', (req, res, next) => {
    Style.create(req.body)
    .then(style => res.json(style))
    .catch(next)
})

router.put('/:styleId', (req, res, next) => {
    Style.findOne({
        where: {id: req.params.styleId}
    })
    .then(style => style.update(req.body))
    .then(style => res.json(style))
    .catch(next)
})

router.delete('/:styleId', (req, res, next) => {
    Style.destroy({
        where: {id: req.params.styleId}
    })
    .then(() => res.send('Successful deletion'))
    .catch(next)
})
