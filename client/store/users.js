import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
const DELETE_USER = 'DELETE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const users = []

/**
 * ACTION CREATORS
 */
const getUsers = users => ({ type: GET_USERS, users })
const deleteUser = userId => ({ type: DELETE_USER, userId })
const updateUser = user => ({ type: UPDATE_USER, user })

/**
 * THUNK CREATORS
 */
export const fetchUsers = () => dispatch => {
    axios.get('/api/users/')
        .then(res => res.data)
        .then(users => {
            dispatch(getUsers(users))
        })
        .catch(err => console.error(err))
}
export const deleteAUser = userId => dispatch => {
    axios.delete(`/api/users/${userId}`)
        .then(() => {
            dispatch(deleteUser(userId))
        })
        .catch(err => console.error(`Removing user: ${userId} unsuccessful`, err))
}

export const changeUser = (userId, adminStatus) => dispatch => {
    axios.put(`/api/users/${userId}`, adminStatus)
        .then(res => {
            dispatch(updateUser(res.data))

        })
        .catch(err => console.error(`Updating user: ${userId} unsuccessful`, err))
}

/**
 * REDUCER
 */
export default function (state = users, action) {
    switch (action.type) {
        case GET_USERS:
            return action.users
        case DELETE_USER:
            return state.filter(user => +action.userId !== +user.id)
        case UPDATE_USER:
            return state.map(user =>
                (+action.user.id === +user.id ? action.user : user))
        default:
            return state
    }
}
