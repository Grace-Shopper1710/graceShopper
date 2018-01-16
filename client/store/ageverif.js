export const TOGGLE_MODAL = 'TOGGLE_MODAL'

export const toggleModal = bool => ({
    type: TOGGLE_MODAL,
    bool
})

export default function (bool = true, action) {
    switch (action.type) {
       case TOGGLE_MODAL: return action.bool
       default: return bool;
    }
}
