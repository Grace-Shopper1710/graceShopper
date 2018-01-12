import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GOT_CART_FROM_SERVER = 'GOT_CART_FROM_SERVER'
// const ADD_TO_CART = 'ADD_TO_CART'
// const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
// const UPDATE_PRODUCT_QUANTITY = 'UPDATE_PRODUCT_QUANTITY'
// const DELETE_CART = 'DELETE_CART'
// const CHECKOUT = 'CHECKOUT'

//ACTION CREATORS
const gotCartFromServer = cart => ({ type: GOT_CART_FROM_SERVER, cart })
// const addToCart = (productId, qty, price) => {
//     const newItem = { productId, qty, price }
//     return { type: ADD_TO_CART, newItem }
// }
// const removeFromCart = item => ({ type: REMOVE_FROM_CART, item })
// const updateQuantity = (beerId, newQuantity) => ({ type: UPDATE_PRODUCT_QUANTITY, beerId, newQuantity })
// const deleteCart = () => ({ type: DELETE_CART })
// const checkout = () => ({ type: CHECKOUT })

/**
 * THUNK CREATORS
 */
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

export const checkout = orderDetails =>
    dispatch =>
        axios.post('/api/cart/checkout', orderDetails)
        .then(res =>
            console.log(res.data))
        .catch(err => console.log(err))

//REDUCER
export default function (state = {}, action) {
    switch (action.type) {
        case GOT_CART_FROM_SERVER:
            return action.cart
        // case ADD_TO_CART:
        //     return
        // case REMOVE_FROM_CART:
        //     return
        // case UPDATE_PRODUCT_QUANTITY:
        //     return
        // case DELETE_CART:
        //     return {}
        // case CHECKOUT:
        //     return {}
        default:
            return state
    }
}
