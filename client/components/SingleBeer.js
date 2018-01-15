import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { addItemToCart } from '../store'
import {default as Review} from './Reviews'
import {default as ReviewForm} from './ReviewForm'

const mapStateToProps = state => ({
	beers: state.product,
	isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
	handleSubmit: (productId, qty, price) => e => {
		e.preventDefault()
		const newItem = { productId, qty, price }
		dispatch(addItemToCart(newItem))
	}
})

export class SingleBeer extends React.Component {
	constructor (props) {
		super(props)
		this.state = { quantity: 0 }
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange (event) {
		this.setState({ quantity: +event.target.value })
	}

	render () {
		const targetBeer = this.props.beers.find(beer => beer.id === +this.props.match.params.id)
		if (!targetBeer) return <div />
		return (
			<div>
			<div className="row">
				<div className="col-md-5">
				<img src={targetBeer.image} />
				</div>
				<div className="col-md-5">
					<h1>{targetBeer.name}</h1>
					<NavLink to={`/styles/${targetBeer.styleId}`}>{targetBeer.style.name}</NavLink><br />
					<NavLink to={`/breweries/${targetBeer.breweryId}`}>{targetBeer.brewery.name}</NavLink><br />
					Description: {targetBeer.description}<br />
					{targetBeer.packaging}<br />
					${targetBeer.price}<br />
					<form onSubmit={this.props.handleSubmit(targetBeer.id, this.state.quantity, targetBeer.price)}>
						<label>
							Quantity:
							<select value={this.state.quantity} onChange={this.handleChange}>
							{
								Array.from(Array(targetBeer.inventory).keys()).map(num => (
									<option key={num} value={num}>{num}</option>
								))
							}
							</select>
						</label><br />
						<button type="submit" value="Add to Cart" className="btn btn-default"> Add to Cart </button>
					</form>
				</div>
			</div>
			<hr />
				<div className="row">
				<div className="col-md-6">
				<Review beer={targetBeer} />
				</div>
				{ this.props.isLoggedIn ?
					<div className="col-md-6">
					<ReviewForm beer={targetBeer} />
					</div> :
					null
				}
				</div>
			</div>
		)
	}
}

const singleBeerContainer = connect(mapStateToProps, mapDispatchToProps)(SingleBeer)
export default singleBeerContainer

