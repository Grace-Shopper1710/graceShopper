import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const mapStateToProps = state => ({ breweries: state.brewery, user: state.user })

export class AllBreweries extends React.Component {

	render() {
		const { breweries, user } = this.props
		const isAdmin = user ? user.isAdmin : false

		return (
			<div className="allBreweries">
				{isAdmin && <NavLink to={'/admin/newbrewery'}><button>Create a New Brewery</button></NavLink>}
				<ul>
					{
						this.props.breweries.map(brewery => (
							<li key={brewery.id}>
							{
									isAdmin &&
									<div>
										<NavLink to={`/breweries/${brewery.id}/edit`}><button>Edit!</button></NavLink>
									</div>
								}
								<img src={brewery.image} />
								<div>
									<NavLink to={`/breweries/${brewery.id}`}>{brewery.name}</NavLink>
									<p>{brewery.style ? brewery.style.name : null}</p>
									<p>{brewery.description}</p>
								</div>
							</li>
						))
					}
				</ul>
			</div>
		)
	}
}

const allBreweriesContainer = connect(mapStateToProps)(AllBreweries)
export default allBreweriesContainer
