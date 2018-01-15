import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

export default class AllUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }
  componentDidMount() {
    axios.get('/api/users/')
      .then(res => res.data)
      .then(users => {
        this.setState({ users })
      })
  }
  render() {
    let val
    let { users } = this.state
    console.log(users, val)
    if (users.length > 0) (console.log("$#$#$#$#$#$#$#", typeof users[0].isAdmin))
    const currentAdmins = users.filter(user => user.isAdmin)
    console.log(currentAdmins)
    return (
      <div>
        <h1>Site Users</h1>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>
              <p> {user.email}</p>
                <div>
                <label>User Is Admin</label>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  console.log("submit button clicked", "value of it:", e.target.isAdmin.value)
                }} action="" onChange={e => { }}>
                  <select name="isAdmin" defaultValue={user.isAdmin}>
                    <option key={`true${user.id}`} value="true"> True</option>
                    <option key={`false${user.id}`} value="false"> False</option>
                  </select>
                  <button type="submit">Submit Admin Status Change</button>
                </form>
                <button>Delete This User</button>
                <button>Prompt Password Reset</button>
                </div>
            </li>))}
        </ul>
      </div>
    )
  }
}
