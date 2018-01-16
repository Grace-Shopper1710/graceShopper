import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const mapStateToProps = state => ({ breweries: state.brewery, user: state.user })

const AllBreweries = (props) => {
	const { breweries, user } = props
	const isAdmin = user ? user.isAdmin : false
	return (
		<div>
			{isAdmin && <NavLink to={'/admin/newbrewery'}><button className="btn btn-primary btn-sm">Add a New Brewery</button></NavLink>}
			{
				breweries.map(brewery => (
					<div key={brewery.id}>
						<NavLink to={`/breweries/${brewery.id}`}><img className="img-thumbnail" src={brewery.image} /></NavLink>
						
						<div>
							<NavLink to={`/breweries/${brewery.id}`}>{brewery.name}</NavLink>
							{brewery.style ? brewery.style.name : null}<br />
							{`${brewery.description.slice(0,160)}...`}
							<NavLink to={`/breweries/${brewery.id}`} className="btn btn-default">Learn More</NavLink>
							<br />
						</div>
						{
							isAdmin &&
							<NavLink to={`/breweries/${brewery.id}/edit`}><button className="btn btn-primary btn-sm">Edit</button></NavLink>
						}
					</div>
				))
			}
		</div>
	)
}

const allBreweriesContainer = connect(mapStateToProps)(AllBreweries)
export default allBreweriesContainer
