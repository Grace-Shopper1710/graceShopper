import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({ breweries: state.brewery })
const mapDispatchToProps = dispatch => ({
    postReview(rev) {
        store.dispatch(addReview(rev))
    }
})

export class ReviewForm extends React.Component {

    render() {
	return (

    )
    }
}

const reviewFormContainer = connect(mapStateToProps)(ReviewForm)
export default reviewFormContainer
