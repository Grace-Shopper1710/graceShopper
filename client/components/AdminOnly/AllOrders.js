import React from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import store, { selectOrderFilter, clearOrderFilter, editOrder } from '../../store'

const mapStateToProps = state => ({
  orders: state.order,
  user: state.user,
  orderFilter: state.orderFilter
})

const mapDispatch = {selectOrderFilter, clearOrderFilter, editOrder}


export class AllOrders extends React.Component {
    constructor(props){
      super(props)
      this.onStatusChange = this.onStatusChange.bind(this)
      this.handleOrderFilter = this.handleOrderFilter.bind(this)
      this.handleClear = this.handleClear.bind(this)
    }

    render (){
      const allOrders = this.props.orders
      const orderStatus = ['CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED']
      const filteredOrders = this.props.orderFilter ? allOrders.filter( order => order.status === this.props.orderFilter) : allOrders



    return (
      <div>

          <div> Order Status:
            <select name="orderStatus" onChange={this.handleOrderFilter}>
              {orderStatus.map((status, i) =>
                <option key={i} value={status}>
                {status}
                </option>
              )}
            </select>
            {this.props.orderFilter &&
            <span>
              <button onClick={this.handleClear}>clear filter</button>
            </span>
            }


          </div>
          <ul>{
            filteredOrders.map((order, i) => {return (
              <li key={order.id}>
                <NavLink to={`/orders/${order.id}`}><h2>Orders #{order.id}</h2></NavLink>
                <p>Name: {order.fullName}</p>
                <p>Address: {order.shippingAddress}</p>
                <p>Orders Status: {order.status}</p>

                <form
                  onSubmit={e => this.onStatusChange(e)}>
                    <select
                      key={order.id}
                      id={order.id}
                      name="updateStatus"
                      defaultValue ={order.status}>
                        {orderStatus.map(status =>
                          <option
                            value={status}>
                            {status}
                          </option>
                      )}
                    </select>
                    <button type="submit" id={order.id}>Update Status</button>
                </form>
              </li>

            )})
          }</ul>
      </div>
    )
    }

  handleOrderFilter(evt){
  evt.preventDefault()
  this.props.selectOrderFilter(evt.target.value)
  }

  handleClear(){
    this.props.clearOrderFilter()
  }

  onStatusChange(evt){
    evt.preventDefault()
    this.props.editOrder(evt.target.updateStatus.id, {status: evt.target.updateStatus.value})
    }
  }


  const AllOrdersContainer = connect(mapStateToProps, mapDispatch)(AllOrders)

export default AllOrdersContainer
