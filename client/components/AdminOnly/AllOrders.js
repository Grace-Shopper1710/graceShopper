import React from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import store, { selectOrderFilter, clearOrderFilter, editOrder } from '../../store'


export class AllOrders extends React.Component {
    constructor(props){
      super(props)
      this.onStatusChange = this.onStatusChange.bind(this)
      this.handleOrderFilter = this.handleOrderFilter.bind(this)
      this.handleClear = this.handleClear.bind(this)
    }

    render (){
      const allOrders = this.props.orders
      const orderStatus = [... new Set(allOrders.map(order => order.status))]

    const filteredOrders = this.props.orderFilter ? allOrders.filter(order=> order.status === this.props.orderFilter) : allOrders

    const isAdmin = this.props.user ? this.props.user.isAdmin : false


    return (
      <div>

          <div> Order Status:
            <select name="orderStatus" onChange={this.handleOrderFilter}>
              {orderStatus.map(status =>
                <option key={status} value={status}>
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
          {<ul>{
            filteredOrders.map((order, i) => {return (
              <li key={order.id}>
                <NavLink to={`/orders/${order.id}`}><h2>Orders #{order.id}</h2></NavLink>
                <p>Name: {order.fullName}</p>
                <p>Address: {order.shippingAddress}</p>
                <p>Orders Status: {order.status}</p>

                <form
                  onSubmit={e => this.onStatusChange(e)}
                  action=""
                  onChange={e => { }}>
                  <span>
                    <select key={order.id} id={order.id}
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
                  </span>
                </form>
              </li>

            )})
          }</ul>
        }
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
    console.log(evt.target.value)
    this.props.editOrder({id: evt.target.id, status: evt.target.value})
    }
  }

  // const mapDispatch = dispatch => ({
  //   handleOrderFilter(e) {
  //     console.log("???", e.target.value)
  //     dispatch(selectOrderFilter(e.target.value))
  //   },
  //   handleClear(){
  //     dispatch(clearOrderFilter())
  //     // dispatch(selectOrderFilter(''))
  //   },
  //   onStatusChange(e){
  //     e.preventDefault()
  //     dispatch(editOrder({id: e.target.id, status:e.target,value}))
  //   }
  // }



  const mapStateToProps = state => ({
    orders: state.order,
    user: state.user,
    orderFilter: state.orderFilter
  })

  const mapDispatch = {selectOrderFilter, clearOrderFilter, editOrder}


  const AllOrdersContainer = connect(mapStateToProps, mapDispatch)(AllOrders)

export default AllOrdersContainer
