import React from 'react'
import { NavLink } from 'react-router-dom'

const BeerItem = (props) => {
	const { beer, isStyle, isBrewery, isAdmin } = props
	return (
		<div className="col-md-4 padding-bottom">
			<NavLink to={`/beers/${beer.id}`}><img src={beer.image} /></NavLink>
				<h4><NavLink to={`/beers/${beer.id}`}>{beer.name}</NavLink></h4>
				{!isStyle && <NavLink to={`/styles/${beer.styleId}`}>{beer.style ? beer.style.name : null}</NavLink>}<br />
				{!isBrewery && <NavLink to={`/breweries/${beer.breweryId}`}>{beer.brewery ? beer.brewery.name : null} / ABV: {beer.abv}</NavLink>}<br />
				{beer.packaging} <br />
				${beer.price} <br />
				{
            	isAdmin &&
				<button className="btn btn-info btn-sm"><NavLink to={`/beers/${beer.id}/edit`}>Edit Beer</NavLink></button>
          		}
		</div>
	)
}

module.exports = BeerItem
