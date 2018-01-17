import React from 'react'
import history from '../history'

export default class OrderConfirmation extends React.Component {
	componentDidMount () {
		setTimeout(() => {
			history.replace('/beers')
		}, 8 * 1000)
	}

	render () {
		return (
			<div>
				<p><strong>Congratulations! Your order has been submitted.</strong></p>
				<p>A confirmation email has been sent to the email address you provided.</p>
				<p>You should be receiving your order in 10-14 days.</p>
				<p> If you have not received a confirmation email, or you have any other questions please email us at <a href="mailto:graceshoppersrs@gmail.com">graceshoppersrs@gmail.com</a>.</p>
				<p>Thank you for your purchase!</p>
				<p><em>(you’ll be redirected to the home page in 10 seconds)</em></p>
			</div>
		)
	}
}
