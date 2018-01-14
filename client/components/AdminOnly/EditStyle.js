import React from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import {updateStyle, removeStyle} from '../../store/style'

class EditStyle extends React.Component {
  constructor(props) {
    super(props)
    this.onStyleSubmit = this.onStyleSubmit.bind(this)
    this.onStyleDelete = this.onStyleDelete.bind(this)
}

render() {
    const { styles } = this.props

    const checkMe = (!styles.length)

    if (checkMe) return <div />

    const targetStyle = this.props.styles.find(sty => sty.id === +this.props.match.params.id)
    if (!targetStyle) return <div />

    return (
        <div>
            <NavLink to={'/admin/newstyle'}><button>Create a New Style</button></NavLink>
            <button 
            onClick={this.onStyleDelete}>
               Delete This Style!</button>
            <form onSubmit={
                this.onStyleSubmit
            }>
                <h1>Edit A Style</h1>
                <ul>
                    <li>
                        Name: 
                        <input
                            name="name"
                            defaultValue={targetStyle.name}
                        />
                    </li>
                    <li>
                        Description: 
                        <textarea
                            name="description"
                            defaultValue={targetStyle.description}
                        />
                    </li>
                </ul>
                <button type="submit">Submit your changes</button>
            </form>
        </div>
    )
}
onStyleDelete(event){
    event.preventDefault() 
    this.props.removeStyle(+this.props.match.params.id, this.props.history)
}

onStyleSubmit(event) {
    event.preventDefault()
    const style = {
        name: event.target.name.value,
        description: event.target.description.value,
    }
    console.log(style)
    this.props.updateStyle(+this.props.match.params.id, style, this.props.history)
}
}



const mapStateToProps = state => ({ styles: state.style })

const mapDispatchToProps = {updateStyle, removeStyle}

const editStyleContainer = connect(mapStateToProps, mapDispatchToProps)(EditStyle)

export default editStyleContainer