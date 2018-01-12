import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const mapStateToProps = state => ({ breweries: state.brewery })


const AllBreweries = (props) => {
	return (
		<div className="allBreweries">
				{
					props.breweries.map(brewery => (
						<div key={brewery.id}>
							<img src={brewery.image} />
							<div>
								<NavLink to={`/breweries/${brewery.id}`}><h2>{brewery.name}</h2></NavLink>
								<p>{brewery.style ? brewery.style.name : null}</p>
								<p>{brewery.description}</p>
							</div>
						</div>
					))
				}
		</div>
    )
}

const allBreweriesContainer = connect(mapStateToProps)(AllBreweries)
export default allBreweriesContainer
