export const ADD_BREWERY_FILTER = 'ADD_BREWERY_FILTER'
export const CLEAR_BREWERY_FILTER = 'CLEAR_BREWERY_FILTER'

export const addBreweryFilter = id => ({
    type: ADD_BREWERY_FILTER,
    id
})

export const clearBreweryFilter = () => ({
    type: CLEAR_BREWERY_FILTER
})

export default function reducer (breweryFilter = '', action) {
    switch (action.type) {
        case ADD_BREWERY_FILTER:
            return action.id;
        case CLEAR_BREWERY_FILTER:
            return ''
      default:
        return breweryFilter;
    }
  }
