import axios from 'axios'

export const FETCH_ALL_BREWERIES = 'FETCH ALL BREWERIES'
const UPDATE = 'UPDATE_BREWERY'
const ADD = 'ADD_BREWERY'
const DELETE = 'DELETE_BREWERY'

export const getAllBreweries = breweries => ({
  type: FETCH_ALL_BREWERIES,
  breweries
})

export const update = brewery => ({
  type: UPDATE,
  brewery
})

export const deleteBrewery = breweryId => ({
  type: DELETE,
  breweryId
})

export const addABrewery = brewery => ({
  type: ADD,
  brewery
})

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
  axios.delete(`/api/breweries/${id}`)
    .then(() => {
      dispatch(deleteBrewery(id))
      history.push('/breweries')
    })
    .catch(err => console.error(`Removing brewery: ${id} unsuccessful`, err));
}
export const addBrewery = (brewery, history) =>
  dispatch => {
    axios.post('/api/breweries/', brewery)
    .then(res => {
      dispatch(addABrewery(res.data))
      history.push('/breweries')
    })
        .catch(err => console.error(`Adding brewery was unsuccessful`, err))
  }

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
    case ADD:
      return [...breweries, action.brewery]
    default:
      return breweries
  }
}

