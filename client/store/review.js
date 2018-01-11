import axios from 'axios'

export const FETCH_ALL_REVIEWS = 'FETCH_ALL_REVIEWS'

//Action Creators
export const getAllReviews = (reviews) => ({
    type: FETCH_ALL_REVIEWS,
    reviews
})

//Thunk Functions
export const fetchAllReviews = () =>
  dispatch =>
    axios.get('/api/reviews')
    .then(res => res.data)
    .then(reviews => dispatch(getAllReviews(reviews)))
    .catch(err => console.error(err))

//Reducer
export default function (reviews = [], action) {
    switch (action.type) {
        case FETCH_ALL_REVIEWS:
            return action.reviews
        default:
            return reviews
    }
}
