import React from 'react'
import { connect } from 'react-redux'
import BeerItem from './BeerItem'
import store, {searchInventory} from '../store'

export class SearchBar extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const {handleChange} = this.props
    // const beerSearch = this.props.beers.filter(beer => beer.name.match(inputValue))

    return (
      <div>
          <form className='form-group' style={{marginTop: '20px'}}>
            <input
              name = "searchBeer"
              onChange={handleChange}
              value={inputValue}
              className='form-control'
              placeholder="Search our selection"
            />
          </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({beers: state.product})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      handleChange (evt) {
        dispatch(searchInventory(evt.target.value))
      }
    }
}


 const searchBarContainer = connect(mapStateToProps)(mapDispatchToProps)(SearchBar)

 export default searchBarContainer
//make a search inventory action and reducer
//review how filtered content is used with reducers
