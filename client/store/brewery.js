import axios from 'axios'


export const FETCH_ALL_BREWERIES = 'FETCH ALL BREWERIES'
const UPDATE = 'UPDATE_BREWERY'
const DELETE = 'DELETE_BREWERY'



//ACTION CREATOR
export const getAllBreweries = (breweries) => {
  return {
    type: FETCH_ALL_BREWERIES,
    breweries
  }
}
const update = brewery => ({
  type: UPDATE,
  brewery
})
const deleteBrewery = breweryId => ({
  type: DELETE,
  breweryId
})

//THUNK FUNCTION
export const fetchAllBreweries = () =>
  dispatch =>
    axios.get('/api/breweries')
      .then(res => res.data)
      .then(breweries => dispatch(getAllBreweries(breweries)))
      .catch(err => console.error(err))

export const updateBrewery = (id, brewery, history) =>
  dispatch =>
    axios.put(`/api/breweries/${id}`, brewery)
      .then(res => {
        dispatch(update(res.data))
        history.push('/breweries')

      })
      .catch(err => console.error(`Updating brewery: ${brewery} unsuccessful`, err))

export const removeBrewery = (id, history) => dispatch => {
  console.log("Im also in here")
  axios.delete(`/api/breweries/${id}`)
    .then(() => {
      dispatch(deleteBrewery(id))
      history.push('/breweries')
    })
    .catch(err => console.error(`Removing brewery: ${id} unsuccessful`, err));
}
export const addBrewery = (brewery, history) => dispatch => {
  axios.post('/api/breweries/', brewery)
    .then(() => {
      axios.get('/api/breweries')
        .then(res => res.data)
        .then(breweries => dispatch(getAllBreweries(breweries)))
        .then(() => {
          history.push('/breweries')
        })
    })
    .catch(err => console.error(`Adding brewery was unsuccessful`, err));
}


//REDUCER
export default function (breweries = [], action) {
  switch (action.type) {
    case FETCH_ALL_BREWERIES:
      return action.breweries
    case UPDATE:
      return breweries.map(brewery => (
        action.brewery.id === brewery.id ? action.brewery : brewery
      ))
    case DELETE:
      return breweries.filter(brewery =>
        action.breweryId !== brewery.id
      )
    default:
      return breweries
  }
}

