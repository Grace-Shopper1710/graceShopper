import React from 'react'
import { NavLink } from 'react-router-dom'

const BeerItem = (props) => {
	const { beer, isStyle, isBrewery } = props
	return (
		<div className="beerItem">
			<NavLink to={`/beers/${beer.id}`}><img src={beer.image} /></NavLink><br />
				<NavLink to={`/beers/${beer.id}`} className="beerName">{beer.name}</NavLink><br />
				{!isStyle && <NavLink to={`/styles/${beer.styleId}`}>{beer.style ? beer.style.name : null}</NavLink>}<br />
				{!isBrewery && <NavLink to={`/breweries/${beer.breweryId}`}>{beer.brewery ? beer.brewery.name : null} / ABV: {beer.abv}</NavLink>} <br />
				{beer.packaging} <br />
				${beer.price} <br />
		</div>
	)
}

module.exports = BeerItem
