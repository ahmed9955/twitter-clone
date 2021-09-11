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

export const notificationsNoted = async (id) => {

    const requestOptions = {
        method: 'POST',
        redirect: 'follow',
      };
      
    const response = await fetch(`${URL}/notifications/${id}`, requestOptions)
    await response.json()
    
}


export const getnotificationsCount = async () => {

  const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers:{

          'Content-Type': 'application/json',
          'Authorization': localStorage.token

      }
    };
    
  const response = await fetch(`${URL}/notificationscount`, requestOptions)
  const result = await response.json()
  
  return result
}
