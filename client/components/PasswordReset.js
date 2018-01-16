import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import zxcvbn from 'zxcvbn'

class PasswordReset extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessage: "",
            password: "",
            passwordStrength: -1,
            buttonAllowed: false
        }
        this.onPasswordSubmit = this.onPasswordSubmit.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    render() {
        let { buttonAllowed, errorMessage, password, passwordStrength } = this.state
        const { user } = this.props
        const pswdMsgArr = ["you have not entered a password", "way too weak", "please make more complicated", "almost there", "ok I'll take it", "THIS IS AN AMAZING PASSWORD GREAT JOB!"]
        const pswdColorArr = ["black", "maroon", "red", "orange", "yellow", "green"]
        let pswdStrengthMsgColor = pswdColorArr[passwordStrength + 1]
        let passwordStrengthMessage = pswdMsgArr[passwordStrength + 1]

        if (!user.id) return <div />
        return (
            <div>
                <form onSubmit={this.onPasswordSubmit}>
                    <h3>Enter a New Password</h3>
                    <input
                        onChange={this.handlePasswordChange}
                        name="password"
                    />
                    {
                        buttonAllowed ?
                            <button type="submit">Submit your password</button>
                            :
                            <button type="submit" disabled>Submit your password</button>
                    }
                </form>
                <br/>
                <h6 style={{ color: pswdStrengthMsgColor }}>{passwordStrengthMessage}</h6>
            </div>
        )
    }
    handlePasswordChange(event) {
        let passwordStrength
        const password = event.target.value
        if (password === "") passwordStrength = -1
        else passwordStrength = zxcvbn(password).score
        console.log(passwordStrength)
        if (passwordStrength > 3) {
            const buttonAllowed = true
            this.setState({ password, passwordStrength, buttonAllowed })
        } else {
            this.setState({ password, passwordStrength })
        }
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