import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import store, {fetchAllBreweries} from '../store'

const mapStateToProps = state => ({ breweries: state.brewery })
const mapDispatchToProps = dispatch => ({
    getAllBreweries() {
        store.dispatch(fetchAllBreweries())
    }
})

export class AllBreweries extends React.Component {

    componentDidMount() {
        store.dispatch(fetchAllBreweries())
    }

    render() {
	return (
		<div>
            Hello!!!!!!
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

const allBreweriesContainer = connect(mapStateToProps, mapDispatchToProps)(AllBreweries)
export default allBreweriesContainer
