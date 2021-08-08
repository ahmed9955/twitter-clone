import { types } from "./user-type";

const INITIAL_STATE = {
    user: null,
    token: '',
    nameCheck: false
}

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case types.SET_NEW_USER:
            return {
                ...state,
                user: action.payload
            }
        case types.SET_AUTH_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case types.SET_NAME_CHECK: 
            return {
                ...state,
                nameCheck: action.payload
            }

        default:
            return state;
    }
}

export default userReducer