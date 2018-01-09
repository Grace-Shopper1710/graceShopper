import axios from 'axios'

export const FETCH_ALL_PRODUCTS = 'FETCH_ALL_PRODUCTS'

export const getAllProducts = (products) => ({
    type: FETCH_ALL_PRODUCTS,
    products
})

export const fetchAllProducts = () =>
  dispatch =>
    axios.get('/api/products')
    .then(res => res.data)
    .then(products => dispatch(getAllProducts(products)))
    .catch(err => console.error(err))

export default function (products = [], action) {
    switch (action.type) {
        case FETCH_ALL_PRODUCTS:
            return action.products
        default:
            return products
    }
}