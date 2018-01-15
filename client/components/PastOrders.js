import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const mapStateToProps = state => ({
  orders: state.order,
  user: state.user
})

export const PastOrders = (props) => {
  const user = props.user
  const orders = props.orders || []
  const userOrders = orders.filter(order => order.userId === user.id)
  return (
    <div>
      <ul>
        {userOrders.map(order => {return (
          <li key={order.id}>
          <NavLink to= {`/orders/${order.id}`}>{order.id}</NavLink>
          <p>{order.fullName}</p>
          <p>{order.shippingAddress}</p>
          <p>Order Status: {order.status}</p>
          <p>${order.total}</p>
          </li>
        )})}
      </ul>
    </div>
  )
}

const PastOrdersContainer = connect(mapStateToProps)(PastOrders)

export default PastOrdersContainer
//figure out where to put  line orders
//will it be a separate component like order Detail
//when do we  get line orders from the state?
