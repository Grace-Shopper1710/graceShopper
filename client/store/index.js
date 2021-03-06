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
import promoCode from './promoCode'
import discount from './discount'
import order from './order'
import users from './users'
import styleFilter from './styleFilter'
import breweryFilter from './breweryFilter'
import sortFilter from './sortFilter'
import ageverif from './ageverif'
import dirtyForm from './dirtyForm'
import orderFilter from './orderFilter'

const reducer = combineReducers({
  user,
  product,
  brewery,
  style,
  cart,
  searchInput,
  loading,
  review,
  reviewForm,
  promoCode,
  discount,
  order,
  users,
  styleFilter,
  breweryFilter,
  sortFilter,
  ageverif,
  dirtyForm,
  orderFilter
})

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
export * from './promoCode'
export * from './discount'
export * from './order'
export * from './users'
export * from './styleFilter'
export * from './breweryFilter'
export * from './sortFilter'
export * from './ageverif'
export * from './dirtyForm'
export * from './orderFilter'
