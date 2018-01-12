import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { addItemToCart } from '../store'

const mapStateToProps = state => ({ beers: state.product })

const mapDispatchToProps = dispatch => ({
	handleSubmit: (productId, qty, price) => event => {
		event.preventDefault()
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
		const targetBeer = this.props.beers.filter(beer => beer.id === +this.props.match.params.id)[0] || {}
		return (
			<div className="singleBeer">
				<img src={targetBeer.image} />
				<div>
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
						<input type="submit" value="Add to Cart" />
					</form>
				</div>
			</div>
		)
	}
}

const singleBeerContainer = connect(mapStateToProps, mapDispatchToProps)(SingleBeer)
export default singleBeerContainer

