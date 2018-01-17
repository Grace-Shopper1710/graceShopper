import React from 'react'
import { connect } from 'react-redux'
import {searchInventory} from '../store'

const mapStateToProps = state => ({
  beers: state.product,
  searchInput: state.searchInput
})

const mapDispatchToProps = dispatch => ({
  handleChange (e) {
    e.preventDefault()
    dispatch(searchInventory(e.target.value.toLowerCase()))
  }
})

const SearchBar = props => {
  return (
    <div>
        <form>
          <input
            name="searchBeer"
            onChange={props.handleChange}
            value={props.searchInput}
            placeholder="Search our selection"
          />
        </form>
    </div>
  )
}

const searchBarContainer = connect(mapStateToProps, mapDispatchToProps)(SearchBar)
export default searchBarContainer
