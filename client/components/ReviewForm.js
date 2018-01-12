import React from 'react'
import { connect } from 'react-redux'
import { writeReview, postReview, clearReview } from '../store'

const mapStateToProps = state => ({ breweries: state.brewery })
const mapDispatchToProps = dispatch => ({
    handleChange: name => event => {
        const newReview = {
            [name]: event.target.value
        }
        dispatch(writeReview(newReview))
    },
    handleSubmit: event => {
        event.preventDefault()
        const review = {
            rating: event.target.rating.value || null,
            content: event.target.content.value || null
        }
        dispatch(postReview(review))
        dispatch(clearReview())
    }
})

const ReviewForm = (props) => {
	return (
        <form onSubmit={props.handlSubmit}>
            <div>
                <h2> Add a Review</h2>
                <label> Rating:
                    <input
                        type="text"
                        name="rating"
                        value={props.newReview.rating}
                        onChange={props.handleChange('rating')}
                    />
                </label><br />
                <label> Review:
                    <input
                        type="text"
                        name="content"
                        placeholder="Reviews must be at least 100 characters long"
                        value={props.newReview.content}
                        onChange={props.handleChange('content')}
                        />
                </label><br />
                <button type="submit"> Add Review </button>
            </div>
        </form>
    )
}

const reviewFormContainer = connect(mapStateToProps, mapDispatchToProps)(ReviewForm)
export default reviewFormContainer
