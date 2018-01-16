import React from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import store, { selectOrderFilter, clearOrderFilter } from '../../store'


const mapStateToProps = state => ({
  orders: state.order,
  users: state.users,
  orderFilter: state.orderFilter
})

const mapDispatch = dispatch => ({
  handleOrderFilter(e) {
    dispatch(selectOrderFilter(e.target.value))
  },
  handleClear(){
    dispatch(clearOrderFilter())
    dispatch(selectOrderFilter(''))
  }
})


export class AllOrders extends React.Component {
    constructor(props){
      super(props)
    }

    render (){
      const allOrders = this.props.orders
      const orderStatus = [... new Set(allOrders.map(order => order.status))]

    const filteredOrders = this.props.orderFilter ? allOrders.filter(order=> order.status === this.props.orderFilter) : allOrders




    return (
      <div>

          <div> Order Status:
            <select name="orderStatus" onChange={this.props.handleOrderFilter}>
              {orderStatus.map(status =>
                <option key={status} value={status}>
                {status}
                </option>
              )}
            </select>
            {this.props.orderFilter &&
            <span>
              <button onClick={this.props.handleClear}>clear filter</button>
            </span>
            }


          </div>
          {<ul>{
            filteredOrders.map(order => {return (
              <li key={order.id}>
                <NavLink to={`/orders/${order.id}`}><h2>Orders #{order.id}</h2></NavLink>
                <p>Name: {order.fullName}</p>
                <p>Address: {order.shippingAddress}</p>
                <p>Orders Status: {order.status}</p>
              </li>
            )})
          }</ul>
        }
      </div>
    )
    }
  }


const AllOrdersContainer = connect(mapStateToProps, mapDispatch)(AllOrders)

export default AllOrdersContainer
