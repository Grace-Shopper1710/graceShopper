import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import store from '../store'

const mapStateToProps = state => ({styles: state.style, user: state.user})

export class AllStyles extends React.Component {

  render(){

    const {styles, user} = this.props
    const isAdmin = user ? user.isAdmin : false

    return(
      <div>
        {isAdmin && <NavLink to={'/admin/newstyle'}><button>Create a New Style</button></NavLink>}
        <ul>
          {
            styles.map(style => (
              <li key={style.id}>
              {
									isAdmin &&
									<div>
										<NavLink to={`/style/${style.id}/edit`}><button>Edit!</button></NavLink>
									</div>
								}
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
