import axios from 'axios'

export const SEARCH_INVENTORY = 'SEARCH_INVENTORY'

//Action Creators
export const searchInventory = (searchInput) => ({
    type: SEARCH_INVENTORY,
    searchInput
})

//Reducer
export default function reducer (searchInput = '', action) {
    switch (action.type) {
      case SEARCH_INVENTORY:
        return action.searchInput;
      default:
        return searchInput;
    }
  }
