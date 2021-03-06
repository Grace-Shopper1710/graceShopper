import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({ reviews: state.review })

const Reviews = props => {
	let id
	props.beer ? id = props.beer.id : id = props.user.id
	const reviews = props.reviews.filter(review => review.productId === id)
	return (
		<div className="reviewContainer">
				{
					reviews.sort((a, b) => b.id - a.id).map(review => (
					<div key={review.id}>
						<h2> {new Array(review.rating).fill(String.fromCodePoint(127866)).map(a => {return a})} </h2>
						<div className="reviewBox">{review.content}</div>
						<br />
                    </div>
					))
				}
		</div>
    )
}

const allReviewsContainer = connect(mapStateToProps)(Reviews)
export default allReviewsContainer
