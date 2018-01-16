const express = require('express')
const router = express.Router()
const { Product, Order, LineItem } = require('../db/models')
const stripe = require('stripe')('sk_test_CEGGnbJKwt6W2rUaSjqRSvth')
const nodemailer = require('nodemailer')

module.exports = router

//Where should we form a new cart?
//- when user add first item in the cart?

router.use((req, res, next) => {
	if (!req.session.cart) req.session.cart = { products: [], total: 0 }
	next()
})

router.get('/', (req, res, next) => {
	let cart = req.session.cart.products.length ? req.session.cart : false
	res.json(cart)
})

router.put('/:productId', (req, res, next) => {
	removeFromCart(+req.params.productId, req)
	res.send(req.session.cart)
})

router.put('/:productId/:qty', (req, res, next) => {
	updateQuantity(+req.params.productId, +req.params.qty, req)
	res.send(req.session.cart)
})

//Add to cart
router.put('/', (req, res, next) => {
	let newItem  = { id: req.body.productId, qty: req.body.qty, price: req.body.price }
	if (inCart(newItem.id, req)) {
		updateCart(newItem.id, newItem.qty, req)
	} else {
		addToCart(newItem, req)
	}
	res.send(req.session.cart);
})
// What if the quantity is 0?
// - solve by using drop down qty form(1 to ?)?
// - solve by conditional in front end? backend?

router.get('/promocode', (req, res, next) => {
	stripe.coupons.list()
	.then(coupons => (
		res.json(coupons)
	))
	.catch(err => console.error(err))
})

//nodeMailer transporter
let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	    user: 'graceshoppersrs@gmail.com',
	    pass: 'random#2CODY6'
	}
})

//Place Order - Final Click
router.post('/checkout', (req, res, next) => {
	let cart = req.session.cart
	let itemList = ''
	//reduce instead
	cart.products.forEach(product => {
		itemList += `<li>Product: ${product.id} Quantity: ${product.qty} Price: ${product.price}</li>`
	})
	let emailContent = `<h3>${req.body.card.name},</h3>
			<p>Thank you for your order from Beer Shop.</p>
			<p>Once your package ships we will send an email with a link to track your order.</p>
			<p>If you have questions about your order, you can email us at <a href="graceshoppersrs@gmail.com">chukohsin@gmail.com</a></p>
			<h3>Order Details</h3>
			<ul>${itemList}</ul>
			<p>Total: ${cart.total}</p>`
	stripe.customers.create({
		email: req.body.email,
		source: req.body.id
	})
	.then(customer =>  stripe.charges.create({ amount: Math.round(+cart.total * 100), currency: 'usd', customer: customer.id}))
    .then(order => {
		return Order.create({
		name: req.body.card.name,
		email: req.body.email,
		total: cart.total,
		address: req.body.card.address_line1,
		zipCode: req.body.card.address_zip,
		city: req.body.card.address_city,
		state: req.body.card.address_state,
		stripeTokenId: req.body.id,
		userId: req.user ? req.user.id : null
		})
    })
	.then(order => Promise.all(
		cart.products.map(product => (
			LineItem.create({
				productId: product.id,
				price: product.price,
				quantity: product.qty,
				orderId: order.id
			})
		))
	))
	.then(LineItems => {
		let mailOptions = {
			from: 'graceshoppersrs@gmail.com',
			to: req.body.email,
			subject: 'Your Beer Order Confirmation',
			html: emailContent
		}
		//error handle this
		transporter.sendMail(mailOptions, function (err, info) {
		   if (err) console.log("email fail")
		   else console.log(info);
		})
		req.session.destroy()
		res.send(LineItems)
	})
	.catch(err => res.status(500).send({ error: err }))

})

/* --------- Helper Functions --------- */

//Check whther this item is already in cart
function inCart(productId, req) {
	return req.session.cart.products.reduce((accu, curr) => {
		return curr.id === productId || accu
	}, false)
}

function updateQuantity(productId, qty, req) {
	req.session.cart.products.forEach(el => {
		if (el.id === productId) {
			el.qty  = qty
		}
	})
	calculateTotals(req)
}

function updateCart(productId, qty, req) {
	req.session.cart.products.forEach(el => {
		if (el.id === productId) {
			el.qty  = el.qty + qty
		}
	})
	calculateTotals(req)
}

function addToCart(newItem, req) {
	req.session.cart.products.push(newItem)
	calculateTotals(req)
}

function removeFromCart(productId, req) {
	req.session.cart.products.forEach((el, i) => {
		if (el.id === productId) {
			req.session.cart.products.splice(i, 1)
		}
	})
	calculateTotals(req)
}

function calculateTotals(req) {
	req.session.cart.total = req.session.cart.products.reduce((accu, curr) => {
		return accu + curr.qty * curr.price
	}, 0).toFixed(2)
}

function postStripeCharge (res) { return (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}}
