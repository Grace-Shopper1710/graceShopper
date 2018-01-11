import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import store, {fetchAllBreweries} from '../store'
import BeerItem from './BeerItem'

const SingleBrewery = (props) => {
    const id = props.match.params.id
    const breweries = props.breweries
    const brewery = breweries.filter(brewery => { return brewery.id === +id})[0] || {}
    const beer = props.beers.filter(beer => beer.breweryId === +id)
    return (
        <div>
            <img src= {brewery.image} />
            <h2>{brewery.name}</h2>
            <p>{brewery.city}, {brewery.country}</p>
            <p>{brewery.description}</p>
            <BeerItem beer={beer} />
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    beers: state.product,
    breweries: state.brewery
})

const SingleBreweryContainer = connect(mapStateToProps)(SingleBrewery)
export default SingleBreweryContainer
