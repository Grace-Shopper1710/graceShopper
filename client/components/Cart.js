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
							<StripeCheckout
								shippingAddress = {true}
								billingAddress = {true}
								amount={props.cart.total * 100}
								token={props.onToken(props.cart.total * 100)}
								currency={'USD'}
								stripeKey={'pk_test_GknBAWoOhGnIpyYlADnXg10z'}>
							</StripeCheckout>
								<div key={product.id}>
								<div>
									<div className="col-md-2">Item: <NavLink to={`/beers/${item.id}`}>{item.name}</NavLink></div>
									<div className="col-md-2">Item Price: ${product.price}</div>
									<div className="col-md-2">
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
									</div>
									</div>
									<div className="col-md-2">${product.price * product.qty}</div>
									<button className="btn-danger btn-sm col-md-3" onClick={props.handleClick(product.id)}>Remove from Cart</button>
								</div>
							)
						})
					}
				</div>
				: <h2>Nothing in the Cart! Go get some beers!</h2>
			}
			<br /><br /><br />
			<div className="text-md-left">
				<p>Subtotal:</p>
				<p>Tax</p>
				<p>Total: ${props.cart ? props.cart.total : 0}</p>
				<NavLink to={'/checkout'} className="btn btn-success">Checkout</NavLink>
			</div>
		</div>
	)
}

const cartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default cartContainer
// {
// 					 (this.state.discount.type === 'amount_off') &&
// 						<span> - {this.state.discount.amount}</span>
					
// 				}