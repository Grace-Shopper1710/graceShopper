import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import BeerItem from './BeerItem'
import store from '../store'


const mapStateToProps = state => ({
  beers: state.product,
  searchInput: state.searchInput
})

const allBeers =  (props) => {

  const {beers, searchInput} = props
  const filteredBeers = beers ? beers.filter( beer => {
    return beer.name.toLowerCase().startsWith(searchInput)}) : []

	return (
		<div>
			<ul>
				{
					filteredBeers.map(beer => (
						<BeerItem key={beer.id} beer={beer} />
					))
				}
			</ul>
		</div>
	)
}

const allBeersContainer = connect(mapStateToProps)(allBeers)
export default allBeersContainer
