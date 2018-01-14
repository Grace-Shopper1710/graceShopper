import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import store from '../store'
import BeerItem from './BeerItem'

const SingleBrewery = (props) => {
    const id = props.match.params.id
    const breweries = props.breweries
    const selectedBrewery = breweries.find(brewery => { return brewery.id === +id })
    const matchingBeers = props.beers.filter(beer => beer.breweryId === +id)

      //if it's an invalid brewery or it hasn't loaded the data yet
  if (!selectedBrewery) return <div />
    return (
        <div>
            <img src={selectedBrewery.image} />
            <h1>{selectedBrewery.name}</h1>
            <p>{selectedBrewery.city}, {selectedBrewery.country}</p>
            <p>{selectedBrewery.description}</p>
            <div className="allBeers">
            {
                matchingBeers.map(beer => (
                    <BeerItem key={beer.id} beer={beer} isBrewery={true} />
                ))
            }
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    beers: state.product,
    breweries: state.brewery
})

const SingleBreweryContainer = connect(mapStateToProps)(SingleBrewery)
export default SingleBreweryContainer
