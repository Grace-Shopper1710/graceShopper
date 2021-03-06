import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'



const mapState = (state, ownProps) => ({
  orders: state.order,
  products: state.product,
  user: state.user
})

const  OrderDetail = (props) => {

    if (!props.orders.length) return <div>Retrieving your orders</div>

    const selectedOrder = props.orders.find(order => order.id === +props.match.params.id)

    const products = props.products
    if (!selectedOrder.lineItems) return <div>iThere is a problem with your order, we'll be reaching out shortly</div>

    return (

        <div>
          <div><NavLink to={`/orders`}>{props.user.isAdmin && <button>Back to All Orders</button>}</NavLink></div>

            <div>
              <h2>Order ID #: {selectedOrder.id}</h2>
              <span><b>Order Status:</b>{selectedOrder.status}</span>
              <span><b>Last Updated:</b> {selectedOrder.updatedAt.slice(0,10)}</span>
           </div>


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

          </ul>

        </div>
      )
}


const OrderDetailContainer = connect(mapState)(OrderDetail)

export default OrderDetailContainer
