import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import BeerItem from './BeerItem'
import store from '../store'



const mapStateToProps = state => ({
  beers: state.product,
	searchInput: state.searchInput,
	user: state.user
})

const allBeers =  (props) => {


	const {beers, searchInput, user} = props
	const isAdmin = user ? user.isAdmin : false

	console.log("do I capture the user well???", user)
  const filteredBeers = beers ? beers.filter( beer => {
		return beer.name.toLowerCase().startsWith(searchInput)}) : []

	return (
		<div>
			<ul>
				{
					filteredBeers.map(beer => (
						<BeerItem key={beer.id} beer={beer} isAdmin={isAdmin}/>
					))
				}
			</ul>
		</div>
	)
}

const allBeersContainer = connect(mapStateToProps)(allBeers)
export default allBeersContainer
