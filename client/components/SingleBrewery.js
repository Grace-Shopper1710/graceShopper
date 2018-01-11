import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import store from '../store'
import BeerItem from './BeerItem'

const SingleBrewery = (props) => {
    const id = props.match.params.id
    const breweries = props.breweries
    const selectedBrewery = breweries.filter(brewery => { return brewery.id === +id})[0] || {}
    const matchingBeers = props.beers.filter(beer => beer.breweryId === +id)
    return (
        <div>
            <img src= {selectedBrewery.image} />
            <h2>{selectedBrewery.name}</h2>
            <p>{selectedBrewery.city}, {selectedBrewery.country}</p>
            <p>{selectedBrewery.description}</p>
            <BeerItem beer={matchingBeers} />
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    beers: state.product,
    breweries: state.brewery
})

const SingleBreweryContainer = connect(mapStateToProps)(SingleBrewery)
export default SingleBreweryContainer
