import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const INITIALIZE_CART = 'INITIALIZE_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_PRODUCT_QUANTITY = 'UPDATE_PRODUCT_QUANTITY'
const DELETE_CART = 'DELETE_CART'
const CHECKOUT = 'CHECKOUT'

/**
 * INITIAL STATE
 */
const defaultCart = {}

/**
 * ACTION CREATORS
 */
const initializeCart = cart => ({ type: INITIALIZE_CART, cart })
const addToCart = (item, qty) => ({ type: ADD_TO_CART, item, qty })
const removeFromCart = item => ({ type: REMOVE_FROM_CART, item })
const updateQuantity = (beerId, newQuantity) => ({ type: UPDATE_PRODUCT_QUANTITY, beerId, newQuantity })
const deleteCart = () => ({ type: DELETE_CART })
const checkout = () => ({ type: CHECKOUT })

/**
 * THUNK CREATORS
 */
export const initCart = () =>
    dispatch =>
        axios.get('/api/cart/')
            .then(res =>
                dispatch(initializeCart(res.data)))
            .catch(err => console.log(err))

export const addItemToCart = (item, qty) =>
    dispatch =>
        axios.get('/api/cart/')
            .then(res =>
                dispatch(initializeCart(res.data)))
            .catch(err => console.log(err))




/**
 * REDUCER
 */
export default function (state = defaultCart, action) {
    switch (action.type) {
        case INITIALIZE_CART:
            return action.cart
        case ADD_TO_CART:
            return
        case REMOVE_FROM_CART:
            return
        case UPDATE_PRODUCT_QUANTITY:
            return
        case DELETE_CART:
            return {}
        case CHECKOUT:
            return {}    
        default:
            return state
    }
}