import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import BeerItem from './BeerItem'
import FilterBar from './FilterBar'

const mapStateToProps = state => ({
	beers: state.product,
	searchInput: state.searchInput,
	user: state.user,
	styleFilter: state.styleFilter
})

const allBeers = (props) => {
	const { beers, searchInput, user } = props
	const isAdmin = user ? user.isAdmin : false
	const filteredBeers = beers ? beers.filter(beer => {
		return beer.name.toLowerCase().startsWith(searchInput)
	}) : []

	return (
		<div>
			<FilterBar />
			{isAdmin && <NavLink to={'/admin/newbeer'} className="btn btn-default">Create a New Beer</NavLink>}
			<div className="row">
				{
					filteredBeers.map(beer => (
						<BeerItem key={beer.id} beer={beer} isAdmin={isAdmin} />
					))
				}
			</div>
		</div>
	)
}

const allBeersContainer = connect(mapStateToProps)(allBeers)
export default allBeersContainer
