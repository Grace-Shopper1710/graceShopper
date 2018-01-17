import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const mapStateToProps = state => ({ styles: state.style, user: state.user })

const AllStyles = (props) => {
    const { styles, user } = props
    const isAdmin = user ? user.isAdmin : false
    if (!styles.length) return <div/>
    return (
      <div>
        {isAdmin && <NavLink to={'/admin/newstyle'}>Add New Style</NavLink>}
          {
            styles.map(style => (
              <div key={style.id}>
                <div>
                  <NavLink to={`/styles/${style.id}`}><h2>{style.name}</h2></NavLink>
                  <p>{style.description.slice(0, 160)}... <NavLink to={`/styles/${style.id}`} className="btn btn-default">Learn More</NavLink> 
                  {
                  isAdmin &&
                  <div>
                  <NavLink to={`/style/${style.id}/edit`}>Edit</NavLink>
                  <br/>
                  </div>
                  }
                  </p>
                </div>
              </div>
            ))
          }
      </div>
    )
}

const AllStylesContainer = connect(mapStateToProps)(AllStyles)
export default AllStylesContainer
