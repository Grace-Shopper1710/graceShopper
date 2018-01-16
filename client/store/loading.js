export const LOADING_CHANGE = 'LOADING_CHANGE'

export const changeLoadingStatus = () => {
  return {
    type: LOADING_CHANGE
  }
}

export default function (loading = true, action) {
  switch (action.type) {
    case LOADING_CHANGE:
      return !loading
    default:
      return loading
  }
}

