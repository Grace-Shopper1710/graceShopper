import axios from 'axios'

export const SELECT_ORDER_STATUS = 'SELECT_ORDER_STATUS'
export const CLEAR_ORDER_STATUS = 'CLEAR_ORDER_STATUS'

export const selectOrderFilter = (selectedStatus) => ({
  type: SELECT_ORDER_STATUS,
  selectedStatus
})

export const clearOrderFilter = () => ({
  type: CLEAR_ORDER_STATUS
})

export default function reducer (orderFilter = 'Filter by status', action){
  switch (action.type) {
    case SELECT_ORDER_STATUS:
      return action.selectedStatus
    case CLEAR_ORDER_STATUS:
      return 'Filter by status'
    default:
      return orderFilter
  }
}
