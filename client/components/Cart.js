import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { removeFromCart, updateItemQuantity } from '../store'

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
			<button><NavLink to={'/checkout'}>Checkout</NavLink></button>
		</div>
	
	)
}

const cartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default cartContainer
