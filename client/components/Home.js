import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import store, {fetchAllProducts} from '../store'
export default class OurTest extends React.Component {

    componentDidMount() {
        store.dispatch(fetchAllProducts())
    }

    render (){
    return (
      <div>
          <h1>Images for home page</h1>
      </div>
    )
    }
  }
  