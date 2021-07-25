import { types } from "./modal-types";

const INITIAL_STATE = {
    display: false,
    displayPrivacy: false,
    displayConfirm: false,
    displayVerification: false
}

const modalReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case types.SET_MODAL_VISIBILITY:
            return {
                ...state,
                display: action.payload
            }

        case types.SET_PRIVACY_VISIBLITY:
            return {
                ...state,
                displayPrivacy: action.payload
            }
        case types.SET_CONFIRM_VISIBLITY:
            return {
                ...state,
                displayConfirm: action.payload
            }
        case types.SET_VERIFICATION_VISIBLITY:
            return {
                ...state,
                displayVerification: action.payload
            }

        default:
            return state;
    }
}

export default modalReducer