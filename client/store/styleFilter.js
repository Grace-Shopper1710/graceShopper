export const ADD_STYLE_FILTER = 'ADD_STYLE_FILTER'

export const addStyleFilter = id => ({
    type: ADD_STYLE_FILTER,
    id
})

export default function reducer (styleFilter = '', action) {
    switch (action.type) {
      case ADD_STYLE_FILTER:
        return action.id;
      default:
        return styleFilter;
    }
  }
