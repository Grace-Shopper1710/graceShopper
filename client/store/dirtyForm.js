export const DIRTY_FORM = 'DIRTY_FORM'

export const dirtyForm = bool => ({
    type: DIRTY_FORM,
    bool
})

export default function (bool = false, action) {
    switch (action.type) {
       case DIRTY_FORM: return action.bool
       default: return bool;
    }
}
