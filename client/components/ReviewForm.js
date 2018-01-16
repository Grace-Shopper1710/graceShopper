import React from 'react'
import { connect } from 'react-redux'
import { writeReview, postNewReview, dirtyForm } from '../store'


const mapStateToProps = state => ({
    breweries: state.brewery,
    reviewForm: state.reviewForm,
    user: state.user,
    isDirty: state.dirtyForm
})

const mapDispatchToProps = dispatch => ({
    handleChange: name => event => {
        const newReview = {
            [name]: event.target.value
        }
        dispatch(writeReview(newReview))
        if (event.target.value.length >= 100 || (event.target.value.length >= 1 && event.target.name === 'content')) {
            dispatch(dirtyForm(true))
        } else if (event.target.value.length < 100) {
            dispatch(dirtyForm(false))
        }
    },
    handleSubmit: props => event => {
        event.preventDefault()
        const review = {
            rating: event.target.rating.value || null,
            content: event.target.content.value || null,
            productId: props.beer.id,
            userId: props.user.id
        }
        dispatch(postNewReview(review))
    }
})

const ReviewForm = props => {
	return (
        <form onSubmit={props.handleSubmit(props)}>
            <h2> Add a Review</h2>
            <div>
                Rating:<br />
                <div className="row">
                    <label className="col-md-1">
                        <input
                            type="radio"
                            name="rating"
                            value="1"
                            onChange={props.handleChange('rating')}
                        /> 1
                    </label>
                    <label className="col-md-1">
                        <input
                            type="radio"
                            name="rating"
                            value="2"
                            onChange={props.handleChange('rating')}
                        /> 2
                    </label>
                    <label className="col-md-1">
                        <input
                            type="radio"
                            name="rating"
                            value="3"
                            onChange={props.handleChange('rating')}
                        /> 3
                    </label>
                    <label className="col-md-1">
                        <input
                            type="radio"
                            name="rating"
                            value="4"
                            onChange={props.handleChange('rating')}
                        /> 4
                    </label>
                    <label className="col-md-1">
                        <input
                            type="radio"
                            name="rating"
                            value="5"
                            onChange={props.handleChange('rating')}
                        /> 5
                    </label>
                    <br />
                </div>
                <label> Review:<br />
                    <textarea
                        type="text"
                        name="content"
                        placeholder="Reviews must be at least 100 characters long"
                        value={props.reviewForm.content}
                        onChange={props.handleChange('content')}
                        />
                </label>
                <button type="submit" disabled={props.isDirty}> Add Review </button><br />
                {props.isDirty && <p>review must be at least 100 characters</p>}
            </div>
        </form>
    )
}

const reviewFormContainer = connect(mapStateToProps, mapDispatchToProps)(ReviewForm)
export default reviewFormContainer
