import React from 'react'
import { connect } from 'react-redux'
import {deleteAUser, changeUser} from '../../store'

class AllUsers extends React.Component {
  constructor(props) {
    super(props)
    this.onAdminChange = this.onAdminChange.bind(this)
    this.onUserDelete = this.onUserDelete.bind(this)
    this.onPasswordResetTrigger = this.onPasswordResetTrigger.bind(this)
  }

  render() {
    const {users} = this.props
    if (!users.length) return <div />
    return (
      <div>
        <h1>Site Users</h1>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <p> {user.email}</p>
                <div>
                <label>User Is Admin</label>
                <form onSubmit={e=>this.onAdminChange(e, user.id)} action="" onChange={e => { }}>
                  <select name="isAdmin" defaultValue={user.isAdmin}>
                    <option key={`true${user.id}`} value="true"> True</option>
                    <option key={`false${user.id}`} value="false"> False</option>
                  </select>
                  <button type="submit">Submit Admin Status Change</button>
                </form>
                <button onClick={e=>this.onUserDelete(e, user.id)}>Delete This User</button>
                <button onClick={e=>this.onPasswordResetTrigger(e, user.id)}>Prompt Password Reset</button>
                <p></p>
                </div>
            </li>))}
        </ul>
      </div>
    )
  }
  onUserDelete(event, userId){
    event.preventDefault()
    //console.log(userId)
    this.props.deleteAUser(userId)
  }
  onAdminChange(event, userId){
    event.preventDefault()
    const changeVal = event.target.isAdmin.value
    const changeHow = (changeVal === "true")? true : false
    this.props.changeUser(userId, {isAdmin: changeHow})
  }
  onPasswordResetTrigger(event, userId){
    event.preventDefault()
    this.props.changeUser(userId, {passwordReset: true})
  }
}


const mapStateToProps = state => ({ users: state.users })

const mapDispatchToProps = {deleteAUser, changeUser}

/*
lyssa reference:
const mapDispatchToProps = dispatch => ({
  onAdminChange(event, userId){
    event.preventDefault()
    dispatch(changeUser(userId, {isAdmin: changeHow}))
  }
})
 */

const allUsersContainer = connect(mapStateToProps, mapDispatchToProps)(AllUsers)

export default allUsersContainer
