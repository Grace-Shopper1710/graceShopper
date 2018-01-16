import axios from 'axios'

export const FETCH_ALL_STYLES = 'FETCH ALL STYLES'
const UPDATE = 'UPDATE_STYLE'
const DELETE = 'DELETE_STYLE'
const ADD = 'ADD_STYLE'

export const getAllStyles = (styles) => {
  return {
    type: FETCH_ALL_STYLES,
    styles
  }
}

export const updateSingleStyle = style => ({
  type: UPDATE,
  style
})

export const addSingleStyle = style => ({
  type: ADD,
  style
})

export const deleteStyle = styleId => ({
  type: DELETE,
  styleId
})

export const fetchAllStyles = () =>
  dispatch =>
    axios.get('/api/styles')
      .then(res => res.data)
      .then(styles => dispatch(getAllStyles(styles)))
      .catch(err => console.error(err))

export const updateStyle = (id, style, history) =>
  dispatch =>
    axios.put(`/api/styles/${id}`, style)
      .then(res => {
        dispatch(updateSingleStyle(res.data))
        history.push('/styles')

      })
      .catch(err => console.error(`Updating style: ${id} unsuccessful`, err))

export const removeStyle = (id, history) => dispatch => {
  axios.delete(`/api/styles/${id}`)
    .then(() => {
      dispatch(deleteStyle(id))
      history.push('/styles')
    })
    .catch(err => console.error(`Removing style: ${id} unsuccessful`, err))
}
export const addStyle = (style, history) => dispatch => {
  axios.post('/api/styles/', style)
  .then(res => {
    dispatch(addSingleStyle(res.data))
    history.push('/styles')

  })
    .catch(err => console.error(`Adding style was unsuccessful`, err))
}

export default function (styles = [], action) {
  switch (action.type) {
    case FETCH_ALL_STYLES:
      return action.styles
    case UPDATE:
      return styles.map(style => (
        action.style.id === style.id ? action.style : style
      ))
    case DELETE:
      return styles.filter(style =>
        action.styleId !== style.id
      )
      case ADD:
      return [...styles, action.style]
    default:
      return styles
  }
}

