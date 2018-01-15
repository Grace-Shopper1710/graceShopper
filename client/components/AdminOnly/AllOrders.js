import React from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import store from '../../store'

const mapStateToProps = state => ({
  orders: state.order,
  users: state.users
})

export class AllOrders extends React.Component {
    constructor(props){
      super(props)
    }
    render (){
      const allOrders = this.props.orders

    if(!allOrders.length) return (<div>a thing happened</div>)
    return (
      <div>
          <ul>{allOrders.map(order => {return (
            <li key={order.id}>
              <h2>Orders #{order.id}</h2>
              <p>Name: {order.fullName}</p>
              <p>Address: {order.shippingAddress}</p>
              <p>Orders Status: {order.status}</p>
            </li>
          )}
        )}</ul>
      </div>
    )
    }
  }


const AllOrdersContainer = connect(mapStateToProps)(AllOrders)

export default AllOrdersContainer
