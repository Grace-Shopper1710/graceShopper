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
	const products = props.cart.products || []
	return (
		<div className="container">
			{
				props.cart && products.length
				? <div className="row">
					{
						props.cart.products.map(product => {
							const item = props.beers.filter(beer => beer.id === product.id)[0] || {}
							return (
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
