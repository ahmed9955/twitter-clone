import { URL } from "./user"

export const chat = async () => {

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      }
    
      const response = await fetch(`${URL}/chat`, requestOptions)
      const result = await response.json()

      return result
      
}


export const chatShowMessage = async (id) => {

  const requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      }
    }
  
    const response = await fetch(`${URL}/showchatmessage/${id}`, requestOptions)
    const result = await response.json()

    return result
    
}
