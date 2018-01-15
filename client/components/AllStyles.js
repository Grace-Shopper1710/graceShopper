import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const mapStateToProps = state => ({ styles: state.style, user: state.user })

const AllStyles = (props) => {
    const { styles, user } = props
    const isAdmin = user ? user.isAdmin : false
    return (
      <div>
        {isAdmin && <NavLink to={'/admin/newstyle'} className="btn btn-primary">Add New Style</NavLink>}
          {
            styles.map(style => (
              <div key={style.id}>
                <div>
                  <NavLink to={`/styles/${style.id}`}><h2>{style.name}</h2></NavLink>
                  <p>{style.description}</p>
                  {
                  isAdmin &&
                  <NavLink to={`/style/${style.id}/edit`} className="btn btn-primary btn-sm">Edit</NavLink>
                  }
                </div>
              </div>
            ))
          }
      </div>
    )
}

const AllStylesContainer = connect(mapStateToProps)(AllStyles)
export default AllStylesContainer
