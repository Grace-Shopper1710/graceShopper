export const ADD_SORT_FILTER = 'ADD_SORT_FILTER'
export const CLEAR_SORT_FILTER = 'CLEAR_SORT_FILTER'

export const addSortFilter = filter => ({
    type: ADD_SORT_FILTER,
    filter
})

export const clearSortFilter = () => ({
    type: CLEAR_SORT_FILTER
})

export default function reducer (sortFilter = '', action) {
    switch (action.type) {
        case ADD_SORT_FILTER:
            return action.filter;
        case CLEAR_SORT_FILTER:
            return ''
        default:
            return sortFilter;
    }
  }
