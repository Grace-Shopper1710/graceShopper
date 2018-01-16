const router = require('express').Router()
const {User} = require('../db/models')

module.exports = router

router.put('/:userId', (req, res, next) => {
  const id = req.params.userId
  if (req.user && (req.user.isAdmin || +req.user.id === +id)) {
    User.findById(req.params.userId/*, {
      attributes: ['id', 'email']
    }*/)
    .then(user => user.update(req.body))
    .then(user => user.update({passwordReset: false}))
    .then(user => res.json(user))
} else {
    const err = new Error('Not Authorized')
    err.status = 403
    next(err)
}
  
})

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
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'isAdmin']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId,
  {attributes: ['id', 'email']
  })
  .then(user => res.json(user))
  .catch(next)
})

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
})

router.delete('/:userId', isAdmin, (req, res, next) => {
  User.destroy({
      where: {id: req.params.userId}
  })
  .then(() => res.send('Successful deletion'))
  .catch(next)
})

