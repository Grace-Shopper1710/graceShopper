import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import store from '../store'

const mapStateToProps = state => ({styles: state.style})

export class AllStyles extends React.Component {

  render(){

    const styles = this.props.styles

    return(
      <div>
        what about now
        <ul>
          {
            styles.map(style => (
              <li key={style.id}>
                <div>
                  <NavLink to={`/styles/${style.id}`}>{style.name}</NavLink>
                  <p>{style.description}</p>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

const AllStylesContainer = connect(mapStateToProps)(AllStyles)
export default AllStylesContainer

//state => style: [{id, name, description }, {...}]
