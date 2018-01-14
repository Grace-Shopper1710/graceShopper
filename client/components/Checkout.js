import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { checkout } from '../store'
import StripeCheckout from 'react-stripe-checkout'

const mapStateToProps = state => ({ cart: state.cart, beers: state.product })

const mapDispatchToProps = dispatch => ({
	handleSubmit: () => event => {
		event.preventDefault()
		const orderDetails = {
			firstName: event.target.firstName.value,
			lastName: event.target.lastName.value,
			address: event.target.shippingAddress.value,
			city: event.target.city.value,
			state: event.target.state.value,
			zipCode: event.target.zipCode.value
		}
		dispatch(checkout(orderDetails))
	},
	onToken: () => token => {
		console.log('hello')
	}
})

export const Checkout = (props) => {
	return (
		<div>
			<ul>
				{
					props.cart.products.map(product => {
						const item = props.beers.filter(beer => beer.id === product.id)[0]
						return (
							<li key={product.id}>
								<NavLink to={`/beers/${item.id}`}>Item: {item.name}</NavLink>
								<span>Item Price: ${product.price}</span>
								<span>Quantity: {product.qty}</span>
								<span>Total Price: ${product.price * product.qty}</span>
							</li>
						)
					})
				}
				<p>Total: ${props.cart.total}</p>
			</ul>
			<form onSubmit={props.handleSubmit()}>
				<h3>Customer Information</h3>
				<ul>
					<li>
						<label> First Name:
				        <input type="text" name="firstName" />
				        </label>
					</li>
					<li>
						<label> Last Name:
				        <input type="text" name="lastName" />
				        </label>
					</li>
					<li>
						<label> Shipping Address:
				        <input type="text" name="shippingAddress" />
				        </label>
					</li>
					<li>
						<label> City:
				        <input type="text" name="city" />
				        </label>
					</li>
					<li>
						<label> State:
				        <input type="text" name="state" />
				        </label>
					</li>
					<li>
						<label> Zip Code:
				        <input type="text" name="zipCode"/>
				        </label>
					</li>
				</ul>
				<p>Your money will go to my account :) </p>
		        <StripeCheckout
		        	shippingAddress = {true}
					token={props.onToken}
					currency={'USD'}
					stripeKey={'pk_live_3diRHOuRsooJvsCmuhV4sgZP'}
				/>
			</form>
		</div>
	)
}

const checkoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout)
export default checkoutContainer
