import { URL } from "./user";

export const setCommentLike = async (id) => {

    const requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: {
            'Authorization': localStorage.token
        }
      };
      
    const response = await fetch(`${URL}/comment/like/${id}`, requestOptions)
    const result = await response.json()

    return result
}

export const setCommentDislike = async (id) => {

    const requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: {
            'Authorization': localStorage.token
        }
      };
      
    const response = await fetch(`${URL}/comment/dislike/${id}`, requestOptions)
    const result = await response.json()

    return result

}