import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GOT_CART_FROM_SERVER = 'GOT_CART_FROM_SERVER'


//ACTION CREATORS
export const gotCartFromServer = cart => ({ type: GOT_CART_FROM_SERVER, cart })


//THUNK CREATORS
export const fetchCart = () =>
    dispatch =>
        axios.get('/api/cart/')
            .then(res =>
                dispatch(gotCartFromServer(res.data)))
            .catch(err => console.log(err))

export const addItemToCart = (newItem) =>
    dispatch =>
        axios.put('/api/cart/', newItem)
        .then(res =>
            dispatch(gotCartFromServer(res.data)))
        .catch(err => console.log(err))

export const removeFromCart = (productId) =>
    dispatch =>
        axios.put(`/api/cart/${productId}`)
        .then(res =>
            dispatch(gotCartFromServer(res.data)))
        .catch(err => console.log(err))

export const updateItemQuantity = (productId, qty) =>
    dispatch =>
        axios.put(`/api/cart/${productId}/${qty}`)
        .then(res =>
            dispatch(gotCartFromServer(res.data)))
        .catch(err => console.log(err))

export const checkout = (orderDetails) =>
    dispatch =>
        axios.post('/api/cart/checkout', orderDetails)
        .then(res => {
            dispatch(gotCartFromServer(res.data))
            history.push('/beers')
        })
        .catch(err => console.log(err))

//REDUCER
export default function (state = {}, action) {
    switch (action.type) {
        case GOT_CART_FROM_SERVER:
            return action.cart
        default:
            return state
    }
}
