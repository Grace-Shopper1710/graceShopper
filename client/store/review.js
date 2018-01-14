import axios from 'axios'

export const FETCH_ALL_REVIEWS = 'FETCH_ALL_REVIEWS'
export const GET_REVIEW = 'GET_REVIEW'

export const getAllReviews = (reviews) => ({
    type: FETCH_ALL_REVIEWS,
    reviews
})

export const getReview = (review) => ({
    type: GET_REVIEW,
    review
})

export const fetchAllReviews = () =>
  dispatch =>
    axios.get('/api/reviews')
    .then(res => res.data)
    .then(reviews => dispatch(getAllReviews(reviews)))
    .catch(err => console.error(err))

export const postNewReview = (review) =>
    dispatch =>
      axios.post('/api/reviews', review)
      .then(res => res.data)
      .then(newReview => dispatch(getReview(newReview)))
      .catch(err => console.error(err))

export default function (reviews = [], action) {
    switch (action.type) {
        case FETCH_ALL_REVIEWS:
            return action.reviews
        case GET_REVIEW:
            return [...reviews, action.review]
        default:
            return reviews
    }
}
