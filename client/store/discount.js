//ACTION TYPES
const GOT_CORRECT_PROMOCODE_FROM_USER = 'GOT_CORRECT_PROMOCODE_FROM_USER'

//ACTION CREATORS
export const gotCorrectPromocodeFromUser = discount => ({ type: GOT_CORRECT_PROMOCODE_FROM_USER, discount})

//REDUCER
export default function(state = 0, action) {
	switch (action.type){
		case GOT_CORRECT_PROMOCODE_FROM_USER:
			return action.discount
		default:
			return state
	}
}
