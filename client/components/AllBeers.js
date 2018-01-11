import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const mapStateToProps = state => ({ beers: state.product })

const allBeers =  (props) => {
	return (
		<div>
			<ul>
				{
					props.beers.slice(0, 20).map(beer => (
						<li key={beer.id}>
							<img src={beer.image} />
							<div>
								<NavLink to={`/products/${beer.id}`}>{beer.name}</NavLink>
								<p>{beer.style ? beer.style.name : null}</p>
								<p>{beer.brewery ? beer.brewery.name : null} / ABV: {beer.abv}</p>
								<p>${beer.price}</p>
							</div>
						</li>
					))
				}
			</ul>
		</div>
	)
}

const allBeersContainer = connect(mapStateToProps)(allBeers)
export default allBeersContainer
