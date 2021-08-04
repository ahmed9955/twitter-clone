import { types } from "./user-type";

export const setNewUser = (user) => ({
    type: types.SET_NEW_USER,
    payload: user
})