import axios from 'axios'

//ACTION TYPES
export const GET_ALL_ORDERS = 'GET_ALL_ORDERS'

export const UPDATE_ORDER = 'UPDATE_ORDER'

export const GET_UPDATED_ORDER = 'GET_UPDATED_ORDER'


//ACTION CREATORS
export const getAllOrders = (orders) => {
  return {
    type: GET_ALL_ORDERS,
    orders
  }
}

export const updateOrder = (order) => {
  return {
    type: UPDATE_ORDER,
    order
  }
}

export const getUpdatedOrder = (order) => {
  return {
    type: GET_UPDATED_ORDER,
    order
  }
}

//THUNKS
export const fetchAllOrders = () =>
  dispatch =>
  axios.get('/api/orders')
  .then(res => res.data)
  .then(orders => dispatch(getAllOrders(orders)))
  .catch(err => console.error(err))


  export const editOrder = (order) => dispatch => {
    console.log("&&&", order)
    axios.put(`api/orders/${order.id}`, order)
    .then(res => {
      dispatch(updateOrder(res.data))
    })
    .catch(err => console.error(`Updating order ${order.id} unsucessful`, err))
  }


//REDUCER
export default function (orders = [], action){
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.orders
    case UPDATE_ORDER:
    return orders.map(order =>
        (+action.order.id === +order.id ? action.order : order))
    case GET_UPDATED_ORDER:
      return [...orders, action.order]
    default:
      return orders
  }
}
