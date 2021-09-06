import { URL } from "./user";

export const addReplayToReplay = async (content, id) => {
    
    var formdata = new FormData();
    formdata.append("content", content);


    const requestOptions = {
        method: 'POST',
        headers:{

            "Authorization": localStorage.token
        },

        body: formdata,
        redirect: 'follow'

};

const response = await fetch(`${URL}/comment/replay/${id}`, requestOptions)
const result = await response.json()

console.log(result)

}

export const getCommentReplay = async (id) => {

    const requestOptions = {
        method: 'GET',
        headers:{

            "Content-Type": 'application/json',
            "Authorization": localStorage.token
        },
        redirect: 'follow'

};

    const response = await fetch(`${URL}/replay/${id}`, requestOptions)
    const result = await response.json()
  
    return result
} 

export const setReplayLike = async (id) => {

    const requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: {
            'Authorization': localStorage.token
        }
      };
      
    const response = await fetch(`${URL}/replay/like/${id}`, requestOptions)
    const result = await response.json()

    return result

}