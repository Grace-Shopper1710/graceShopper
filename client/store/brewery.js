import axios from 'axios'


export const FETCH_ALL_BREWERIES = 'FETCH ALL BREWERIES'

//ACTION CREATOR
export const getAllBreweries = (breweries) => {
  return {
    type: FETCH_ALL_BREWERIES,
    breweries
  }
}

//THUNK FUNCTION
export const fetchAllBreweries = () =>
  dispatch =>
    axios.get('/api/breweries')
    .then(res => res.data)
    .then(breweries => dispatch(getAllBreweries(breweries)))
    .catch(err => console.error(err))


//REDUCER
export default function (breweries = [], action) {
  switch (action.type) {
    case FETCH_ALL_BREWERIES:
      return action.breweries
    default:
      return breweries
  }
}

