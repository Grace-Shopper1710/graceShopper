export const ADD_STYLE_FILTER = 'ADD_STYLE_FILTER'
export const CLEAR_STYLE_FILTER = 'CLEAR_STYLE_FILTER'

export const addStyleFilter = id => ({
  type: ADD_STYLE_FILTER,
  id
})

export const clearStyleFilter = () => ({
  type: CLEAR_STYLE_FILTER
})

export default function reducer (styleFilter = '', action) {
    switch (action.type) {
      case ADD_STYLE_FILTER:
        return action.id;
      case CLEAR_STYLE_FILTER:
        return ''
      default:
        return styleFilter;
    }
  }
