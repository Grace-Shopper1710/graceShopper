import axios from 'axios'


export const LOADING_CHANGE = 'LOADING_CHANGE'

//ACTION CREATOR
export const changeLoadingStatus = () => {
  return {
    type: LOADING_CHANGE
  }
}

//REDUCER
export default function (loading = true, action) {
  switch (action.type) {
    case LOADING_CHANGE:
      return !loading
    default:
      return loading
  }
}

