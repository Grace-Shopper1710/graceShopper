export const SEARCH_INVENTORY = 'SEARCH_INVENTORY'
export const CLEAR_SEARCH_INPUT = 'CLEAR_SEARCH_INPUT'

export const searchInventory = searchInput => ({
    type: SEARCH_INVENTORY,
    searchInput
})

export const clearSearchInput = () => ({
  type: CLEAR_SEARCH_INPUT
})

export default function reducer (searchInput = '', action) {
    switch (action.type) {
      case SEARCH_INVENTORY:
        return action.searchInput
      case CLEAR_SEARCH_INPUT:
        return ''
      default:
        return searchInput
    }
  }
