import React from 'react'
import { connect } from 'react-redux'


const mapState = (state, ownProps) => ({
  orders: state.order,
  products: state.product
})

const  OrderDetail = (props) => {

    const selectedOrder = props.orders.find(order => order.id === +props.match.params.id)

    // const beersFromOrder = props.products.filter(product => product.id )

    // const selectedBeer = props.products.find(beer => beer.id === selectedOrder.lineItems.productId)

    // {props.products.filter(product => product.id === lineItem.productId)}

    if (!selectedOrder) return <div>is this the problem?</div>
    console.log(props)
    return (

        <div>
          <h2>Order ID: #{selectedOrder.id}</h2>
          <ul>
            {
              selectedOrder.lineItems.map(lineItem => {

                return (
                <li key={lineItem.id}>
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
