const express = require('express')
const router = express.Router()
const models = require('../db/models')
const Order = models.Order
const nodemailer = require('nodemailer')

module.exports = router;

//constant
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'graceshoppersrs@gmail.com',
        pass: 'random#2CODY6'
    }
})

const shippedEmailContent = `<h3>Hi! Your order from Beers.Beers.Beers has shipped!</h3>
<p>You can track it online: U.S. Postal Service: <a>00000000000000000000</a></p>
<p><strong>Thanks again for your purchase!</strong></p>`

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
    .then(order => {
        let mailOptions = {
            from: 'graceshoppersrs@gmail.com',
            to: order.email,
            subject: 'Your Beer has shipped!',
            html: shippedEmailContent
        }
        if (req.body.status === 'COMPLETED') {
            transporter.sendMail(mailOptions, function (err, info) {
               if (err) console.log('email fail')
               else res.json(order);
            })
        }
        else {
          res.json(order)
        }
    })
    .catch(next)
})

router.delete('/:orderId', isAdmin, (req, res, next) => {
    Order.destroy({
        where: {id: req.params.orderId}
    })
    .then(() => res.send('Successful deletion'))
    .catch(next)
})

