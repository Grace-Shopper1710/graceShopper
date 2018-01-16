import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

class PasswordReset extends React.Component {
    constructor(props) {
        super(props)
        this.onPasswordSubmit = this.onPasswordSubmit.bind(this)
    }

    render() {
        const {user} = this.props
        if (!user.id) return <div/>
        return (
            <div>
                <form onSubmit={this.onPasswordSubmit}>
                    <h1>Enter a New Password</h1>
                    <input
                        name="password"
                    />
                    <button type="submit">Submit your password</button>
                </form>
            </div>
        )
    }

    onPasswordSubmit(event) {
        event.preventDefault()
        const newPassword = event.target.password.value
        axios.put(`/api/users/${this.props.user.id}`, { password: newPassword })
            .then(res => {
                this.props.history.push('/')
            })
            .catch(err => console.error(`Updating user: ${this.props.user.id} unsuccessful`, err))
    }
}

const mapStateToProps = state => ({
    user: state.user
  })

const passwordResetContainer = connect(mapStateToProps)(PasswordReset)

export default passwordResetContainer