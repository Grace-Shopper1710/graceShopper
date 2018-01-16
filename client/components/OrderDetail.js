import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'



const mapState = (state, ownProps) => ({
  orders: state.order,
  products: state.product,
  user: state.user
})

const  OrderDetail = (props) => {

    const selectedOrder = props.orders.find(order => order.id === +props.match.params.id)

    const products = props.products

    if (!selectedOrder) return <div>is this the problem?</div>
    return (

        <div>
          <div><NavLink to={`/orders`}>{props.user.isAdmin && <button>Back to All Orders</button>}</NavLink></div>

          <h2>Order ID #: {selectedOrder.id}</h2>

          <ul>
          <li>Date Placed: {selectedOrder.createdAt.slice(0,10)}</li>

            {
              selectedOrder.lineItems.map(lineItem => {
                return (
                <li key={lineItem.id}>
                <img src={products.find(product => product.id === lineItem.productId).image} className="immg-thumbnail" />
                <p>{products.find(product => product.id === lineItem.productId).name}</p>
                <p>{products.find(product => product.id === lineItem.productId).description}</p>
                <p>quantity: {lineItem.quantity}</p>
                <p>total: {lineItem.price}</p>
                </li>
              )})
            }
          <li>
            <h3>Order Status: {selectedOrder.status}</h3>
            <p>Last Updated: {selectedOrder.updatedAt.slice(0,10)}</p>
          </li>

          </ul>

        </div>
      )
}


const OrderDetailContainer = connect(mapState)(OrderDetail)

export default OrderDetailContainer
