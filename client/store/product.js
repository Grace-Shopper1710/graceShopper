import axios from 'axios'

export const FETCH_ALL_PRODUCTS = 'FETCH_ALL_PRODUCTS'
const UPDATE = 'UPDATE_BEER'
const DELETE = 'DELETE_BEER'

//Action Creators
export const getAllProducts = (products) => ({
    type: FETCH_ALL_PRODUCTS,
    products
})
const update = beer => ({
    type: UPDATE,
    beer
})
const deleteBeer = beerId => ({
    type: DELETE,
    beerId
})

//Thunk Functions
export const fetchAllProducts = () =>
    dispatch =>
        axios.get('/api/products')
            .then(res => res.data)
            .then(products => dispatch(getAllProducts(products)))
            .catch(err => console.error(err))

export const updateBeer = (id, beer, history) =>
    dispatch =>
        axios.put(`/api/products/${id}`, beer)
            .then(res => {
                dispatch(update(res.data))
                history.push('/beers')

            })
            .catch(err => console.error(`Updating beer: ${beer} unsuccessful`, err))

export const removeBeer = (id, history) => dispatch => {
    axios.delete(`/api/products/${id}`)
        .then(() => {
            dispatch(deleteBeer(id))
            history.push('/beers')
        })
        .catch(err => console.error(`Removing beer: ${id} unsuccessful`, err))
}
export const addBeer = (beer, history) => dispatch => {
    axios.post('/api/products/', beer)
        .then(() => {
            axios.get('/api/products')
            .then(res => res.data)
            .then(products => dispatch(getAllProducts(products)))
            .then(() => {
                history.push('/beers')
            })
        })
        .catch(err => console.error(`Adding beer was unsuccessful`, err));
}

//Reducer
export default function (products = [], action) {
    switch (action.type) {
        case FETCH_ALL_PRODUCTS:
            return action.products
        case UPDATE:
            return products.map(beer => (
                action.beer.id === beer.id ? action.beer : beer
            ))
        case DELETE:
            return products.filter(beer =>
                action.beerId !== beer.id
            )

        default:
            return products
    }
}
