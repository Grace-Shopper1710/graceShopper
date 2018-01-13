import axios from 'axios'

export const FETCH_ALL_PRODUCTS = 'FETCH_ALL_PRODUCTS'
const UPDATE = 'UPDATE_STORY'

//Action Creators
export const getAllProducts = (products) => ({
    type: FETCH_ALL_PRODUCTS,
    products
})
const update = beer => ({
    type: UPDATE,
    beer
})

//Thunk Functions
export const fetchAllProducts = () =>
    dispatch =>
        axios.get('/api/products')
            .then(res => res.data)
            .then(products => dispatch(getAllProducts(products)))
            .catch(err => console.error(err))

export const updateBeer = (id, beer) =>
    dispatch =>
        axios.put(`/api/products/${id}`, beer)
            .then(res => dispatch(update(res.data)))
            .catch(err => console.error(`Updating beer: ${beer} unsuccessful`, err))

//Reducer
export default function (products = [], action) {
    switch (action.type) {
        case FETCH_ALL_PRODUCTS:
            return action.products
        case UPDATE:
            return products.map(beer => (
                action.beer.id === beer.id ? action.beer : beer
            ))
        default:
            return products
    }
}
