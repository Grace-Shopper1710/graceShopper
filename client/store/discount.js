//ACTION TYPES
const GOT_CORRECT_PROMOCODE_FROM_USER = 'GOT_CORRECT_PROMOCODE_FROM_USER'
const REMOVE_PROMOCODE = 'REMOVE_PROMOCODE'

//ACTION CREATORS
export const gotCorrectPromocodeFromUser = discount => ({ type: GOT_CORRECT_PROMOCODE_FROM_USER, discount})
export const removePromoCode = () => ({ type: REMOVE_PROMOCODE })

//REDUCER
export default function(state = 0, action) {
	switch (action.type){
		case GOT_CORRECT_PROMOCODE_FROM_USER:
			return action.discount
		case REMOVE_PROMOCODE:
			return 0
		default:
			return state
	}
}
