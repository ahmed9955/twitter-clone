import { URL } from "./user";

export const notifications = async () => {

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers:{
 
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
 
        }
      };
      
    const response = await fetch(`${URL}/notifications`, requestOptions)
    const result = await response.json()
    
    return result
}