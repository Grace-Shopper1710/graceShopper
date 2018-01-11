import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({ reviews: state.review })

const Reviews = (props) => {
	return (
		<div>
				{
					props.reviews.map(review => (
					<div key={review.id}>
                        {review.content}
                    </div>
					))
				}
		</div>
    )
}

const allReviewsContainer = connect(mapStateToProps)(Reviews)
export default allReviewsContainer
