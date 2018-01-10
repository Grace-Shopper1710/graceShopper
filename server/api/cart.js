const express = require('express')
const router = express.Router()
const { Product } = require('../db/models')

module.exports = router

//const newCart = { items: [], totals: 0 }

//Where should we form a new cart?
//- when user add first item in the cart?

router.use((req, res, next) => {
	if (!req.session.cart) req.session.cart = { items: [], totals: 0 }
	next()
})

router.get('/', (req, res, next) => {
	let cart = req.session.cart.items.length ? req.session.cart : false
	res.json(cart)
})

router.delete('/:productId', (req, res, next) => {
	removeFromCart(req.params.productId, req)
	res.send(req.session.cart)
})

//Add to cart
router.post('/', (req, res, next) => {
	let newItem  = { id: req.body.productId, qty: req.body.qty }
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







/* --------- Helper Functions --------- */

//Check whther this item is already in cart
function inCart(productId, req) {
	return req.session.cart.items.reduce((accu, curr) => {
		return curr.id === productId || accu
	}, false)
}

function updateCart(productId, qty, req) {
	req.session.cart.items.forEach(el => {
		if (el.id === productId) {
			el.qty  = el.qty + qty
		}
	})
}

function addToCart(newItem, req) {
	req.session.cart.items.push(newItem)
}

function removeFromCart(productId, req) {
	req.session.cart.items.forEach((el, i) => {
		if (el.id === productId) {
			req.session.cart.items.splice(i, 1)
		}
	})
}

// function calculateTotals(req) {
// 	 let totals = req.session.cart.items.reduce((accu, curr) => {
// 		Product.findOne({
// 			where: {
// 				id: curr.id
// 			}
// 		})
// 		.then(product => {
// 			return accu + product.price * curr.qty
// 		})
// 	}, 0)
// }
