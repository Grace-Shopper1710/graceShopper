import axios from 'axios'


export const FETCH_ALL_STYLES = 'FETCH ALL STYLES'

//ACTION CREATOR
export const getAllStyles = (styles) => {
  return {
    type: FETCH_ALL_STYLES,
    styles
  }
}

//THUNK FUNCTION
export const fetchAllStyles = () =>
  dispatch =>
    axios.get('/api/styles')
    .then(res => res.data)
    .then(styles => dispatch(getAllStyles(styles)))
    .catch(err => console.error(err))


//REDUCER
export default function (styles = [], action) {
  switch (action.type) {
    case FETCH_ALL_STYLES:
      return action.styles
    default:
      return styles
  }
}

