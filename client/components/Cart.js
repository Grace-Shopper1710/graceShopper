import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { removeFromCart, updateItemQuantity } from '../store'
import StripeCheckout from 'react-stripe-checkout'
import { checkout } from '../store'


const mapStateToProps = state => ({ cart: state.cart, beers: state.product })

const mapDispatchToProps = dispatch => ({
	handleClick: (productId) => event => {
		dispatch(removeFromCart(productId))
	},
	handleChange: (productId) => event => {
		if (+event.target.value === 0) dispatch(removeFromCart(productId))
		else {
			dispatch(updateItemQuantity(productId, +event.target.value))
		}
	},
	onToken: () => token => {
		dispatch(checkout(token))
	},
	handlePromoCode: event => {
		console.log('clicked')
	}
})

export const Cart = (props) => {
	return (
		<div>
			{
				props.cart && props.cart.products.length
				? <ul>
					{
						props.cart.products.map(product => {
							const item = props.beers.filter(beer => beer.id === product.id)[0]
							return (
								<li key={product.id}>
								<NavLink to={`/beers/${item.id}`}>Item: {item.name}</NavLink>
								<span>Item Price: ${product.price}</span>
								<span>
									<form>
										<label>
											Quantity:
											<select defaultValue={product.qty} onChange={props.handleChange(product.id)}>
												{
													Array.from(Array(item.inventory).keys()).map(num => (
														<option key={num} value={num}>{num}</option>
													))
												}
											</select>
										</label>
									</form>
								</span>
								<span>Total Price: ${product.price * product.qty}</span>
								<button onClick={props.handleClick(product.id)}>X</button>
								</li>
							)
						})
					}
				</ul>
				: <p>Nothing in the Cart! Go get some beers!</p>
			}
			<p>Subtotal:</p>
			<p>Tax</p>
			<p>Total: ${props.cart ? props.cart.total : 0}</p>
			<form onSubmit={props.handlePromoCode}>
				<label>Promo Code:
					<input type="text" name="promoCode" />
					<button type="submit" value="Submit">Submit</button>
				</label>
			</form>
			<StripeCheckout
				shippingAddress = {true}
				billingAddress = {true}
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
