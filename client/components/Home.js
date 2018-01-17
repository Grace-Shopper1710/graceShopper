import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'


export default class Home extends React.Component {
    render (){
    return (
      <div className='heroImage fadeIn'>
      <img src="https://battleforliberty.com/wp-content/uploads/2017/06/beer-793x526.jpg"/>
      </div>
    )
    }
  }
