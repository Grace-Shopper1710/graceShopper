import React from 'react'
import { connect } from 'react-redux'
import BeerItem from './BeerItem'
import store, {searchInventory} from '../store'

export class SearchBar extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const { handleChange } = this.props

    return (
      <div>
          <form className='form-group' style={{marginTop: '20px'}}>
            <input
              name = "searchBeer"
              onChange={handleChange}
              value={this.props.searchInput}
              className='form-control'
              placeholder="Search our selection"
            />
          </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  beers: state.product,
  searchInput: state.searchInput
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      handleChange (evt) {
        dispatch(searchInventory(evt.target.value))
      }
    }
}

 const searchBarContainer = connect(mapStateToProps, mapDispatchToProps)(SearchBar)

 export default searchBarContainer
