import axios from 'axios'

export const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
export const UPDATE_ORDER = 'UPDATE_ORDER'

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

export const fetchAllOrders = () =>
  dispatch =>
  axios.get('/api/orders')
  .then(res => res.data)
  .then(orders => dispatch(getAllOrders(orders)))
  .catch(err => console.error(err))


  export const editOrder = (orderId, statusUpdate) => dispatch => {
    axios.put(`api/orders/${orderId}`, statusUpdate)
    .then(res => {
      dispatch(updateOrder(res.data))
    })
    .catch(err => console.error(`Updating order ${orderId} unsucessful`, err))
  }


//REDUCER
export default function (orders = [], action){
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.orders
    case UPDATE_ORDER:
    return orders.map(order =>
        (+action.order.id === +order.id ? action.order : order))
    default:
      return orders
  }
}
