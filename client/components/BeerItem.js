import React from 'react'
import { NavLink } from 'react-router-dom'

const BeerItem = (props) => {
	const { beer } = props
	return (
		<li>
			<img src={beer.image} />
			<ul>
				<li><NavLink to={`/beers/${beer.id}`}>{beer.name}</NavLink></li>
				<li><NavLink to={`/styles/${beer.styleId}`}>{beer.style ? beer.style.name : null}</NavLink></li>
				<li><NavLink to={`/breweries/${beer.breweryId}`}>{beer.brewery ? beer.brewery.name : null} / ABV: {beer.abv}</NavLink></li>
				<li><p>${beer.price}</p></li>	
			</ul>
		</li>
	)
}

module.exports = BeerItem
