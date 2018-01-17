import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { addItemToCart } from '../store'
import { default as Review } from './Reviews'
import { default as ReviewForm } from './ReviewForm'

const mapStateToProps = state => ({
	beers: state.product,
	isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
	handleSubmit: (productId, price) => e => {
		e.preventDefault()
		const newItem = { productId, qty: +e.target.qty.value, price }
		dispatch(addItemToCart(newItem))
	}
})

export const SingleBeer = (props) => {
	if (!props.beers.length) return <div />
	if (props.match.params.id>props.beers.length) return <div>Sorry that's not a beer we have!</div>
	const targetBeer = props.beers.find(beer => beer.id === +props.match.params.id)
	if (!targetBeer.brewery) return <div />
	return (
		<div>
			<div className="row">
				<div className="col-md-5">
					<img src={targetBeer.image} className="img-thumbnail" />
				</div>
				<div className="col-md-5">
					<h1>{targetBeer.name}</h1>
					<NavLink to={`/styles/${targetBeer.styleId}`}>{targetBeer.style.name}</NavLink><br />
					<NavLink to={`/breweries/${targetBeer.breweryId}`}>{targetBeer.brewery.name}</NavLink><br />
					{targetBeer.description}<br />
					{targetBeer.packaging}<br />
					${targetBeer.price}<br />
					<form onSubmit={props.handleSubmit(targetBeer.id, targetBeer.price)}>
						<label>
							Quantity:
							<select name="qty">
								{
									Array.from(Array(targetBeer.inventory).keys()).map(num => (
										<option key={num + 1} value={num + 1}>{num + 1}</option>
									))
								}
							</select>
						</label>
						<button className="shake-slow" type="submit" value="Add to Cart"> Add to Cart </button>
						
					</form>
				</div>
			</div>
			<hr />
			<div className="row">
				<div className="col-md-6">
					<Review beer={targetBeer} />
				</div>
				{props.isLoggedIn ?
					<div className="col-md-6">
						<ReviewForm beer={targetBeer} />
					</div> :
					null
				}
			</div>
		</div>
	)
}

const singleBeerContainer = connect(mapStateToProps, mapDispatchToProps)(SingleBeer)
export default singleBeerContainer

