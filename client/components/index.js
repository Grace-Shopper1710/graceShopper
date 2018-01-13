/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {Home} from './Home'
export {default as AllBeers} from './AllBeers'
export {default as SingleBeer} from './SingleBeer'
export {default as AllStyles} from './AllStyles'
export {default as SingleStyle} from './SingleStyle'
export {default as AllBreweries} from './AllBreweries'
export {default as SingleBrewery} from './SingleBrewery'
export {default as Reviews} from './Reviews'
export {default as Cart} from './Cart'
export {default as Checkout} from './Checkout'
export {Footer} from './Footer'
export {default as SearchBar} from './SearchBar'

export {default as AllUsers} from './AdminOnly/AllUsers'
export {default as EditSingleBeer} from './AdminOnly/EditSingleBeer'
export {default as AllOrders} from './AdminOnly/AllOrders'