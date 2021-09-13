import { URL } from "./user";

export const addToBookmark = async (id) => {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        redirect: 'follow',
    };

 const response = await fetch(`${URL}/bookmark/${id}`, requestOptions)
 await response.json()

}




export const getBookmark = async () => {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        redirect: 'follow',
    };

    const response = await fetch(`${URL}/bookmark`, requestOptions)
    const post = await response.json()

    return post
}