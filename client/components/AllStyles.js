import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import store from '../store'

const mapStateToProps = state => ({styles: state.style})

export class AllStyles extends React.Component {

  render(){

    const styles = this.props.styles

    return(
      <div className="allStyles">
        <ul>
          {
            styles.map(style => (
                <div key={style.id}>
                  <NavLink to={`/styles/${style.id}`} className="styleName">{style.name}</NavLink><br />
                  <div className="styleDetail">{style.description}</div>
                </div>
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
