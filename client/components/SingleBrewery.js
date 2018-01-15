import React from 'react'
import { connect } from 'react-redux'
import BeerItem from './BeerItem'

const mapStateToProps = state => ({
    beers: state.product,
    breweries: state.brewery
})

const SingleBrewery = props => {
    const id = props.match.params.id
    const breweries = props.breweries
    const selectedBrewery = breweries.find(brewery => { return brewery.id === +id }) || {}
    const matchingBeers = props.beers.filter(beer => beer.breweryId === +id) || []

    return (
        <div>
            <img src={selectedBrewery.image} />
            <h1>{selectedBrewery.name}</h1>
            <p>{selectedBrewery.city}, {selectedBrewery.country}</p>
            <p>{selectedBrewery.description}</p>
            <div>
            {
                matchingBeers.map(beer => (
                    <BeerItem key={beer.id} beer={beer} isBrewery={true} />
                ))
            }
            </div>
        </div>
    )
}

const SingleBreweryContainer = connect(mapStateToProps)(SingleBrewery)
export default SingleBreweryContainer
