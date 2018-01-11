import React from 'react'
import { NavLink } from 'react-router-dom'

const BeerItem = (props) => {
	const { beer } = props
	return (
		<li>
			<NavLink to={`/beers/${beer.id}`}><img src={beer.image} /></NavLink>
			<ul>
				<li><NavLink to={`/beers/${beer.id}`}>{beer.name}</NavLink></li>
				<li><NavLink to={`/styles/${beer.styleId}`}>{beer.style ? beer.style.name : null}</NavLink></li>
				<li><NavLink to={`/breweries/${beer.breweryId}`}>{beer.brewery ? beer.brewery.name : null} / ABV: {beer.abv}</NavLink></li>
				<li>{beer.packaging}</li>
				<li>${beer.price}</li>
			</ul>
		</li>
	)
}

module.exports = BeerItem
