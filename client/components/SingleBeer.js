import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const mapStateToProps = state => ({ beers: state.product })

export class SingleBeer extends React.Component {
	constructor (props) {
		super(props)
	}

	render () {
		const targetBeer = this.props.beers.filter(beer => beer.id === +this.props.match.params.id)[0]
		console.log(targetBeer)
		return (
			<div>
				<img src={targetBeer.image} />
				<ul>
					<li>{targetBeer.name}</li>
					<li><NavLink to={`/styles/${targetBeer.styleId}`}>{targetBeer.style.name}</NavLink></li>
					<li><NavLink to={`/breweries/${targetBeer.breweryId}`}>{targetBeer.brewery.name}</NavLink></li>
					<li>Description: {targetBeer.description}</li>
					<li>{targetBeer.packaging}</li>
					<li>${targetBeer.price}</li>
					<form>
						<label>
							Quantity:
							<select>
							{
								stupid(targetBeer.inventory).map(num => (
									<option key={num} value={num}>{num}</option>
								))
							}
							</select>
						</label>
					</form>
				</ul>
			</div>
		)
	}
}

const singleBeerContainer = connect(mapStateToProps)(SingleBeer)
export default singleBeerContainer

function stupid(num){
	let arr = []
	for (let i = 1; i < num + 1; i++) {
		arr.push(i)
	}
	return arr
}
