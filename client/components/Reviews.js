import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({ reviews: state.review })

const Reviews = (props) => {
	const reviews = props.reviews.filter(review => review.productId === props.beer.id)
	return (
		<div className="allReviews">
				{
					reviews.sort((a, b) => b.id - a.id).map(review => (
					<div key={review.id}>
						<h2> {review.rating} </h2>
						<div className="reviewContent">{review.content}</div>
						<br />
                    </div>
					))
				}
		</div>
    )
}

const allReviewsContainer = connect(mapStateToProps)(Reviews)
export default allReviewsContainer
