import axios from 'axios'

export const FETCH_ALL_PRODUCTS = 'FETCH_ALL_PRODUCTS'
const UPDATE_BEER = 'UPDATE_BEER'
const DELETE_BEER = 'DELETE_BEER'

export const getAllProducts = (products) => ({
    type: FETCH_ALL_PRODUCTS,
    products
})

export const updateBeer = beer => ({
    type: UPDATE_BEER,
    beer
})

export const deleteBeer = beerId => ({
    type: DELETE_BEER,
    beerId
})

export const fetchAllProducts = () =>
    dispatch =>
        axios.get('/api/products')
            .then(res => res.data)
            .then(products => dispatch(getAllProducts(products)))
            .catch(err => console.error(err))

export const putBeer = (id, beer, history) =>
    dispatch =>
        axios.put(`/api/products/${id}`, beer)
            .then(res => {
                dispatch(updateBeer(res.data))
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

export default function (products = [], action) {
    switch (action.type) {
        case FETCH_ALL_PRODUCTS:
            return action.products
        case UPDATE_BEER:
            return products.map(beer => (
                action.beer.id === beer.id ? action.beer : beer
            ))
        case DELETE_BEER:
            return products.filter(beer =>
                action.beerId !== beer.id
            )

        default:
            return products
    }
}
