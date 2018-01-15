import axios from 'axios'

//ACTION TYPES
const GOT_PROMOCODE_FROM_SERVER = 'GOT_PROMOCODE_FROM_SERVER'

//ACTION CREATORS
const gotPromoCodeFromServer = promoCode => ({ type: GOT_PROMOCODE_FROM_SERVER, promoCode })

//THUNK CREATORS

export const fetchPromoCode = () =>
	dispatch =>
		axios.get('/api/cart/promocode')
		.then(res =>
			dispatch(gotPromoCodeFromServer(res.data.data))
		)
		.catch(err => console.log(err))

//REDUCER
export default function(state = [], action) {
	switch (action.type) {
		case GOT_PROMOCODE_FROM_SERVER:
			return action.promoCode
		default:
			return state
	}
}
