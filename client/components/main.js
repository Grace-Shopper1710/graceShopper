import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout, toggleModal } from '../store'
import AgeVerif from './AgeVerif'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = props => {
  const { children, handleClick, isLoggedIn, isAdmin, cart, ageverif } = props
  return (
    <div className="container-fluid fadeIn">
      {
        ageverif && <AgeVerif />
      }
      <nav>
      <div className="header shake-slow"><img style={{width: 66, height: 58}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Fxemoji_u1F37B.svg/2000px-Fxemoji_u1F37B.svg.png" />BEER</div>
      <div className="navItems">
      {
        !isAdmin
          ? <div>
              <Link to="/beers">Beers</Link>
              <Link to="/breweries">Breweries</Link>
              <Link to="/styles">Styles</Link>
          </div>
          :
          null
      }
        {
            isAdmin
              ? <div>
                {/* The navbar will show these links if you're an Admin */}
                <Link to="/beers">Beers</Link>
                <Link to="/breweries">Breweries</Link>
                <Link to="/styles">Styles</Link>
                <Link to="/users">Users</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/admin/charts">Charts</Link>
              </div>
              :
              null
          }
          {
            isLoggedIn
              ? <div>
                {/* The navbar will show these links after you log in */}
                <a href="#" onClick={handleClick}>Logout</a>
                <Link to="/myorders">My Orders</Link>
              </div>
              : <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
          }
          <Link to="/cart">Cart: {cart.products ? cart.products.reduce((a, b) => a + b.qty, 0) : 0} items</Link>
          </div>
      </nav>
        <hr />
        {children}
    </div>
      )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin && !!state.user.id,
    cart: state.cart,
    ageverif: state.ageverif
  }
}

const mapDispatch = (dispatch) => {
  return {
        handleClick() {
      dispatch(logout())
    },
    openModal (){
      dispatch(toggleModal(true))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}

