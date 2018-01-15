import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { removeFromCart, updateItemQuantity, checkout, gotCorrectPromocodeFromUser } from '../store'
import StripeCheckout from 'react-stripe-checkout'



const mapStateToProps = state => ({ cart: state.cart, beers: state.product, promoCode: state.promoCode, discount: state.discount })

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
			<p>Subtotal: ${props.cart ? props.cart.total : 0}</p>
			<p>Tax: 0</p>
			{
			 !!props.discount && <p>Discount: -{props.discount}</p>
			}
			<p>Total: ${props.cart ? (props.cart.total -props.discount).toFixed(2) : 0}</p>
			<form onSubmit={props.handlePromoCode(props.promoCode, props.cart.total)}>
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
// {
// 					 (this.state.discount.type === 'amount_off') &&
// 						<span> - {this.state.discount.amount}</span>
					
// 				}