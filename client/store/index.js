import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import product from './product'
import brewery from './brewery'
import style from './style'
import cart from './cart'
import loading from './loading'
import searchInput from './searchBar'
import review from './review'
import reviewForm from './reviewForm'
<<<<<<< HEAD
import promoCode from './promoCode'
import discount from './discount'

const reducer = combineReducers({user, product, brewery, style, cart, searchInput, loading, review, reviewForm, promoCode, discount})
=======
import order from './order'

const reducer = combineReducers({user, product, brewery, style, cart, searchInput, loading, review, reviewForm, order})
>>>>>>> 8f3746855a714a155a27e56c5ee32b2c79cfd5c8

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './product'
export * from './brewery'
export * from './style'
export * from './cart'
export * from './searchBar'
export * from './review'
export * from './reviewForm'
export * from './loading'
<<<<<<< HEAD
export * from './promoCode'
export * from './discount'
=======
export * from './order'

>>>>>>> 8f3746855a714a155a27e56c5ee32b2c79cfd5c8
