import React from 'react'
import { connect } from 'react-redux'
import BeerItem from './BeerItem'

const mapStateToProps = state => ({
  styles: state.style,
  beers: state.product
})

const SingleStyle = props => {
  const id = props.match.params.id
  const styles = props.styles
  const selectedStyle = styles.find(style => { return style.id === +id}) || {}
  const matchingBeers = props.beers.filter(beer =>  beer.styleId === +id) || []
  if (id>styles.length) return <div>Sorry that's not a style we have!</div>

  return (
    <div>
      <h1>{selectedStyle.name}s</h1>
      <p>{selectedStyle.description}</p>
      <div>
      {
        matchingBeers.map(beer => (
          <BeerItem key={beer.id} beer={beer} isStyle={true} />
        ))
      }
      </div>
    </div>
  )
}

const SingleStyleContainer = connect(mapStateToProps)(SingleStyle)
export default SingleStyleContainer
