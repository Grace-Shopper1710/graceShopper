import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Reviews from './Reviews'

const mapStateToProps = state => ({
  orders: state.order,
  user: state.user,
  reviews: state.review
})

export const PastOrders = (props) => {
  const user = props.user
  const orders = props.orders || []
  const userOrders = orders.filter(order => order.userId === user.id)
  if (!userOrders.length){
    return (<div><h2>You've made no purchases with us . . .you might wanna get on that</h2></div>)}
  else  {
    return (
      <div className="userView">
        <div>
          <h1> Past Orders </h1>
            {userOrders.map(order => {return (
              <li key={order.id}>
              <NavLink to= {`/myorders/${order.id}`}>{order.id}</NavLink>
              <p>{order.name}</p>
              <p>{order.shippingAddress}</p>
              <p>Order Status: {order.status}</p>
              <p>${order.total}</p>
              </li>
            )})}
        </div>
        <div className="reviewBox">
          <h1> Past Reviews </h1>
          <Reviews user={user} />
        </div>
      </div>
    )
  }
}

const PastOrdersContainer = connect(mapStateToProps)(PastOrders)

export default PastOrdersContainer
//figure out where to put  line orders
//will it be a separate component like order Detail
//when do we  get line orders from the state?
