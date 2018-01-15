import axios from 'axios'

//ACTION TYPES
export const GET_ORDER = 'GET_ORDER'

export const GET_ALL_ORDERS = 'GET_ALL_ORDERS'

//ACTION CREATORS
export const getOrder = (order) => {
  return {
    type: GET_ORDER,
    order
  }
}

export const getAllOrders = (orders) => {
  return {
    type: GET_ALL_ORDERS,
    orders
  }
}

//THUNK
export const fetchAllOrders = () =>
  dispatch =>
  axios.get('/api/orders')
  .then(res => res.data)
  .then(orders => dispatch(getAllOrders(orders)))
  .catch(err => console.error(err))

//REDUCER
export default function (orders = [], action){
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.orders
    case GET_ORDER:
      return [...orders, action.order]
    default:
      return orders
  }
}
