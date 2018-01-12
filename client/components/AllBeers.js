import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import BeerItem from './BeerItem'
import store, { fetchAllProducts } from '../store'

const mapStateToProps = state => ({ beers: state.product })

const allBeers =  (props) => {
	
	return (
		<div>
			<ul>
				{
					props.beers.map(beer => (
						<BeerItem key={beer.id} beer={beer} />
					))
				}
			</ul>
		</div>
	)
}

const allBeersContainer = connect(mapStateToProps)(allBeers)
export default allBeersContainer
