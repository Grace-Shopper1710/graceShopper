import React from 'react'
import {connect} from 'react-redux'
import {addStyle} from '../../store'

class NewStyle extends React.Component {
  constructor(props) {
    super(props)
    this.onStyleSubmit = this.onStyleSubmit.bind(this)
}

render() {
    return (
        <div>
            <form onSubmit={this.onStyleSubmit}>
                <h1>New Style</h1>
                <ul>
                    <li>
                        Name:
                        <input
                            name="name"
                            defaultValue="enter the name"
                        />
                    </li>
                    <li>
                        Description:
                        <textarea
                            name="description"
                            defaultValue="enter the description"
                        />
                    </li>
                </ul>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

onStyleSubmit(event) {
    event.preventDefault()
    const style = {
        name: event.target.name.value,
        description: event.target.description.value,
    }
    this.props.addStyle(style, this.props.history)
    }
}

const mapDispatchToProps = {addStyle}

const newStyleContainer = connect(null, mapDispatchToProps)(NewStyle)

export default newStyleContainer
