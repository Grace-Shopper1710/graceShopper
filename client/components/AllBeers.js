import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import BeerItem from './BeerItem'
import FilterBar from './FilterBar'
import {clearBreweryFilter, clearStyleFilter, clearSortFilter, clearSearchInput} from '../store'

const mapStateToProps = state => ({
	beers: state.product,
	searchInput: state.searchInput,
	user: state.user,
	styleFilter: state.styleFilter,
	breweryFilter: state.breweryFilter,
	sortFilter: state.sortFilter
})

const mapDispatchToProps = dispatch => ({
	clearAllFilters() {
		dispatch(clearStyleFilter())
		dispatch(clearBreweryFilter())
		dispatch(clearSortFilter())
		dispatch(clearSearchInput())
	}
})

export class AllBeers extends React.Component {

	componentWillUnmount() {
	this.props.clearAllFilters()
	}

	render() {
		const { beers, searchInput, user, styleFilter, breweryFilter, sortFilter } = this.props
		const isAdmin = user ? user.isAdmin : false

		const filterFunc = (arr, sI, sF, bF, sort) => {
			if (sI) arr = arr.filter(beer => { return beer.name.toLowerCase().startsWith(searchInput)})
			if (sF) arr = arr.filter(beer => { return beer.styleId === +styleFilter})
			if (bF) arr = arr.filter(beer => { return beer.breweryId === +breweryFilter})
			if (sort === 'highToLow') arr = arr.sort((a, b) => b.price - a.price)
			if (sort === 'lowToHigh') arr = arr.sort((a, b) => a.price - b.price)
			return arr;
		}
		const availableBeers = beers.filter(beer => beer.inventory > 0)
		const filteredBeers = filterFunc(availableBeers, searchInput, styleFilter, breweryFilter, sortFilter)
	return (
		<div className="fadeIn">
			<FilterBar />
			{isAdmin && <NavLink to={'/admin/newbeer'}>Create a New Beer</NavLink>}
			<div className="row">
				{	filteredBeers.length > 0 ?
					filteredBeers.map(beer => (
						<BeerItem key={beer.id} beer={beer} isAdmin={isAdmin} />
					))
					:
					<div className="container">
					<h1> Sorry! No beers match your search results. </h1>
					</div>
				}
			</div>
		</div>
	)
	}
}

const allBeersContainer = connect(mapStateToProps, mapDispatchToProps)(AllBeers)
export default allBeersContainer
