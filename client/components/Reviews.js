import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({ reviews: state.review })

const Reviews = props => {
	const reviews = props.reviews.filter(review => review.productId === props.beer.id)
	console.log(props)
	return (
		<div>
				{
					reviews.sort((a, b) => b.id - a.id).map(review => (
					<div key={review.id}>
						<h2> {new Array(review.rating).fill(String.fromCodePoint(127866)).map(a => {return a})} </h2>
						<div className="text-wrap">{review.content}</div>
						<br />
                    </div>
					))
				}
		</div>
    )
}

const allReviewsContainer = connect(mapStateToProps)(Reviews)
export default allReviewsContainer
