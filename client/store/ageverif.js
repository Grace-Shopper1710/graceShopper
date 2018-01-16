import axios from 'axios'
//ACTION TYPES
export const TOGGLE_MODAL = 'TOGGLE_MODAL'
export const SET_AGEVERIF = 'SET_AGEVERIF'

//ACTION CREATORS
export const toggleModal = bool => ({
    type: TOGGLE_MODAL,
    bool
})

//THUNK CREATORS
export const setAgeVerifOnSession = () =>
	dispatch =>
		axios.post('/auth/ageverif')
		.then(res =>
				dispatch(toggleModal(res.data.ageVerif)))
		.catch(err => console.log(err))

export const fetchAgeVerifFromSession = () =>
	dispatch =>
		axios.get('/auth/ageverif')
		.then(res =>
				dispatch(toggleModal(res.data.ageVerif)))
		.catch(err => console.log(err))


export default function (bool = true, action) {
    switch (action.type) {
       case TOGGLE_MODAL: return action.bool
       default: return bool;
    }
}
