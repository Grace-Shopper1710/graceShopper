import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import store from '../store'
import BeerItem from './BeerItem'

const SingleStyle = (props) => {

  const styleId = props.match.params.id
  const styles = props.styles
  const selectedStyle = styles.filter(style => {
    return style.id === +styleId})[0]

  const matchingBeers = props.beers.filter(beer =>  beer.styleId === +styleId)

  return (
    <div>
      <h2>{selectedStyle.name}</h2>
      <p>{selectedStyle.description}</p>
      {
        matchingBeers.map(beer => (
          <BeerItem key={beer.id} beer={beer} isStyle={true}/>
        ))
      }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  styles: state.style,
  beers: state.product
})

const SingleStyleContainer = connect(mapStateToProps)(SingleStyle)
export default SingleStyleContainer
