import React from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import {updateStyle, removeStyle} from '../../store'

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
            <NavLink to={'/admin/newstyle'} class="btn btn-primary">Create a New Style</NavLink>
            <button onClick={this.onStyleDelete}>Delete Style</button>
            <form onSubmit={this.onStyleSubmit}>
                <h1>Edit Style</h1>
                    <div>
                        Name:
                        <input
                            name="name"
                            defaultValue={targetStyle.name}
                        />
                    </div>
                    <div>
                        Description:
                        <textarea
                            name="description"
                            defaultValue={targetStyle.description}
                        />
                    </div>
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
    this.props.updateStyle(+this.props.match.params.id, style, this.props.history)
}
}

const mapStateToProps = state => ({ styles: state.style })

const mapDispatchToProps = {updateStyle, removeStyle}

const editStyleContainer = connect(mapStateToProps, mapDispatchToProps)(EditStyle)

export default editStyleContainer