const express = require('express')
const router = express.Router()
const models = require('../db/models')
const Review = models.Review

module.exports = router;

router.get('/', (req, res, next) => {
    Review.findAll({
        include: [{all: true}]
    })
    .then(reviews => res.json(reviews))
    .catch(next)
})

router.get('/:reviewId', (req, res, next) => {
    Review.findById(req.params.reviewId,
        {include: [{all: true}]
    })
    .then(review => res.json(review))
    .catch(next)
})

router.post('/', (req, res, next) => {
    Review.create(req.body)
    .then(review => res.json(review))
    .catch(next)
})

router.put('/:reviewId', (req, res, next) => {
    Review.findOne({
        where: {id: req.params.reviewId}
    })
    .then(review => review.update(req.body))
    .then(review => res.json(review))
    .catch(next)
})

router.delete('/:reviewId', (req, res, next) => {
    Review.destroy({
        where: {id: req.params.reviewId}
    })
    .then(() => res.send('Successful deletion'))
    .catch(next)
})