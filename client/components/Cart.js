import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { removeFromCart, updateItemQuantity, checkout, gotCorrectPromocodeFromUser, removePromoCode } from '../store'
import StripeCheckout from 'react-stripe-checkout'

const mapStateToProps = state => ({ cart: state.cart, beers: state.product, promoCode: state.promoCode, discount: state.discount })

const mapDispatchToProps = (dispatch, ownProps) => ({
	handleClick: (productId) => event => {
		dispatch(removeFromCart(productId))
	},
	handleChange: (productId) => event => {
		if (+event.target.value === 0) dispatch(removeFromCart(productId))
		else {
			dispatch(updateItemQuantity(productId, +event.target.value))
		}
	},
	onToken: () => (token) => {
		dispatch(checkout(token))
	},
	removePromoCode: () => (dispatch(removePromoCode())),
	handlePromoCode: (promoCodes, total) => (event) => {
		event.preventDefault()
		promoCodes.forEach(promoCode => {
			if(event.target.promoCode.value === promoCode.id){
				const type = promoCode.amount_off ? 'amount_off' : 'percent_off'
				if(promoCode.amount_off) {
					dispatch(gotCorrectPromocodeFromUser(promoCode.amount_off/100))
				} else {
					dispatch(gotCorrectPromocodeFromUser(total * promoCode.percent_off/100))
				}
			}
		})
	}
})

export const Cart = (props) => {
	console.log('!!!!!!!!!!!!!!!!!!', props)
	const products = props.cart.products || []
	return (
		<div className="container">
			{
				props.cart && products.length 
				?
				<div className="row"> 
					{
						props.cart.products.map(product => {
							const item = props.beers.filter(beer => beer.id === product.id)[0] || {}
							return (
								<div key={product.id} className="cartItems">
									<div className="col-md-2">Item: <NavLink to={`/beers/${item.id}`}>{item.name}</NavLink></div>
									<div className="col-md-2">Item Price: ${product.price}</div>
									<div className="col-md-2">
										<form classname='icon-star'>
											<label>
												Quantity:
												<select defaultValue={product.qty} onChange={props.handleChange(product.id)}>
													{
														Array.from(Array(item.inventory).keys()).map(num => (
															<option key={num + 1} value={num + 1}>{num + 1}</option>
														))
													}
												</select>
											</label>
										</form>
									</div>
									<div className="col-md-2">${product.price * product.qty}</div>
									<button onClick={props.handleClick(product.id)}>Remove from Cart</button>
								</div>
							)
						})
					}
				</div>
				: <h2>Nothing in the Cart! Go get some beers!</h2>
			}
			<br /><br /><br />
			<div className="text-md-left">
				<p>Subtotal: ${props.cart ? props.cart.total : 0}</p>
				<p>Tax: 0</p>
				{ 
					!!props.discount && props.cart.total !== 0 
					&& 
					<div>
					<p>Discount: - ${props.discount.toFixed(2)}</p>
					<button onClick={props.removePromoCode}>Remove Promo Code</button>
					</div>
				}
				<p>Total: ${props.cart && (props.cart.total - props.discount) > 0 ? (props.cart.total - props.discount).toFixed(2) : 0}</p>
			</div>
			<form onSubmit={props.handlePromoCode(props.promoCode, props.cart.total)}>
				<label>Promo Code:
					<input type="text" name="promoCode" />
					<button type="submit" >Submit</button>
				</label>
			</form>
			<StripeCheckout
				shippingAddress = {true}
				billingAddress = {true}
				name="Beer Co."
				description="Wish you were beer!"
				allowRememberMe={false}
				image="https://i.pinimg.com/236x/60/fd/e8/60fde811b6be57094e0abc69d9c2622a--beer-icon-beer-logo-design.jpg"
				amount={props.cart.total * 100}
				token={props.onToken(props.cart.total * 100)}
				currency={'USD'}
				stripeKey={'pk_test_GknBAWoOhGnIpyYlADnXg10z'}>
			</StripeCheckout>
		</div>
	)
}

const cartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default cartContainer
