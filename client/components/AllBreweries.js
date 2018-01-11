import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const mapStateToProps = state => ({ breweries: state.brewery })


export class AllBreweries extends React.Component {

    render() {
	return (
		<div>
			<ul>
				{
					this.props.breweries.map(brewery => (
						<li key={brewery.id}>
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
