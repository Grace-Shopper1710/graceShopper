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

const reducer = combineReducers({user, product, brewery, style, cart, searchInput, loading})

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
export * from './loading'

