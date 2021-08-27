import { types } from "./user-type";

export const setNewUser = (user) => ({
    type: types.SET_NEW_USER,
    payload: user
})

export const setAuthToken = (token) => ({
    type: types.SET_AUTH_TOKEN,
    payload: token

})

export const setNameCheck = (check) => ({
    type: types.SET_NAME_CHECK,
    payload: check

})

export const setMedia = (check) => ({
    type: types.SET_MEDIA,
    payload: check
})

export const setLikes = (check) => ({
    type: types.SET_LIKES,
    payload: check
})