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