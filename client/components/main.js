import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import Footer from './Footer'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, isLoggedIn, isAdmin} = props

  return (
    <div>
      <h1>BEER</h1>
      <nav>
        <Link to="/breweries">Breweries</Link>
        <Link to="/beers">Beers</Link>
        {
          isAdmin
            ? <div>
              {/* The navbar will show these links if you're an Admin */}
              <Link to="/editStyle">Edit Style</Link>
              <Link to="/editProduct">Edit User</Link>
              <Link to="/editProduct">Edit Order</Link>
              <Link to="/editProduct">Edit Brewery</Link>
              <Link to="/orders">All Orders</Link>
              <Link to="/users">All Users</Link>

            </div>
            :
            null
        }
        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              <a href="#" onClick={handleClick}>Logout</a>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
        }
      </nav>
      <hr />
      {children}
      <Footer />
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
    beers: state.products
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
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
