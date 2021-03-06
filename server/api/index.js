const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/breweries', require('./breweries'))
router.use('/styles', require('./styles'))
router.use('/orders', require('./orders'))
router.use('/cart', require('./cart'))
router.use('/reviews', require('./reviews'))
router.use('/ageverif', require('./ageverif'))
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
