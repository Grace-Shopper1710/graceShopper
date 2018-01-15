export const WRITE_REVIEW = 'WRITE_REVIEW'
export const CLEAR_REVIEW = 'CLEAR_REVIEW'

export const writeReview = review => ({
    type: WRITE_REVIEW,
    review
})

export const clearReview = () => ({
    type: CLEAR_REVIEW
})

export default function (newReview = {}, action) {
    switch (action.type) {
        case WRITE_REVIEW:
            return action.review
        default:
            return newReview
    }
}
