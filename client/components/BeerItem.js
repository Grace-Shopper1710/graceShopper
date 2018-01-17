import React from 'react'
import { NavLink } from 'react-router-dom'

const BeerItem = (props) => {
	const { beer, isStyle, isBrewery, isAdmin } = props
	return (
		<div className="col-md-4 padding-bottom">
			<NavLink to={`/beers/${beer.id}`}><img src={beer.image} className="img-thumbnail" /></NavLink>
				<NavLink to={`/beers/${beer.id}`}><h2>{beer.name}</h2></NavLink>
				{!isStyle && <NavLink to={`/styles/${beer.styleId}`}>{beer.style ? beer.style.name : null}</NavLink>}<br />
				{!isBrewery && <NavLink to={`/breweries/${beer.breweryId}`}>{beer.brewery ? beer.brewery.name : null} / ABV: {beer.abv}</NavLink>}<br />
				{beer.packaging} <br />
				${beer.price} <br />
				{
	        	isAdmin &&
				<NavLink to={`/beers/${beer.id}/edit`}><button>Edit Beer</button></NavLink>
          		}
		</div>
	)
}

module.exports = BeerItem
