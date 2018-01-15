import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import { Main, Login, Signup, UserHome, AllBeers, SingleBeer, AllStyles, SingleStyle, AllBreweries, SingleBrewery, Footer, Cart, Checkout, EditSingleBeer, AllUsers, AllOrders, NewBeer, EditBrewery, NewBrewery, EditStyle, NewStyle} from './components'
import {me, fetchAllProducts, fetchAllStyles, fetchAllBreweries, fetchCart, fetchAllReviews, fetchPromoCode} from './store'

import Home from './components/Home'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Router history={history}>
        <Main cart={this.props.cart}>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/" component={Home} />
            <Route exact path="/beers" component={AllBeers} />
            <Route exact path="/beers/:id" component={SingleBeer} />
            <Route exact path="/breweries" component={AllBreweries} />
            <Route exact path="/breweries/:id" component={SingleBrewery} />
            <Route exact path="/styles" component={AllStyles} />
            <Route exact path="/styles/:id" component={SingleStyle} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/home" component={UserHome} />
                  {
                    isAdmin &&
                      <Switch>
                         {/* Routes placed here are only available to admin users */}
                        <Route path="/users" component={AllUsers} />
                        <Route path="/orders" component={AllOrders} />
                        <Route exact path="/beers/:id/edit" component={EditSingleBeer} />
                        <Route exact path="/style/:id/edit" component={EditStyle} />
                        <Route exact path="/breweries/:id/edit" component={EditBrewery} />
                        <Route path="/admin/newbeer" component={NewBeer} />
                        <Route path="/admin/newbrewery" component={NewBrewery} />
                        <Route path="/admin/newstyle" component={NewStyle} />
                      </Switch>
                  }
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin && !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
      dispatch(fetchAllProducts())
      dispatch(fetchAllStyles())
      dispatch(fetchAllBreweries())
      dispatch(fetchCart())
      dispatch(fetchAllReviews())
      dispatch(fetchPromoCode())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
