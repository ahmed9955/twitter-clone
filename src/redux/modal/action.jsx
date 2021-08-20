import { types } from "./modal-types";

export const setModalVisibility = (display) => ({
    type: types.SET_MODAL_VISIBILITY,
    payload: display
})

export const setPrivacyVisibility = (display) => ({
    type: types.SET_PRIVACY_VISIBLITY,
    payload: display
})

export const setConfirmVisibility = (display) => ({
    type: types.SET_CONFIRM_VISIBLITY,
    payload: display
})

export const setVerificationVisibility = (display) => ({
    type: types.SET_VERIFICATION_VISIBLITY,
    payload: display
})

export const setResetPasswordVisibility = (display) => ({
    type: types.SET_RESET_PASSWORD_VISIBILITY,
    payload: display
})

export const setTwitterButtonActive = (active) => ({
    type: types.SET_TWITTER_BUTTON_ACTIVE,
    payload: active
})