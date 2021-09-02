import { URL } from "./user";


export const whoToFollow = async () => {
    var requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json' ,
        'Authorization': localStorage.token
      },
      redirect: 'follow',
    };
  
    const response = await fetch(`${URL}/users/whotofollow`, requestOptions)
    const user = await response.json()
    
    return user
  }
  


export const requestFollow = async (id) => {

    const requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        }
      };
      
    const response = await fetch(`${URL}/requestFollow/${id}`, requestOptions)
    const request = await response.json()

    console.log('req follow',request)

    }

export const following = async () => {
    
    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        }
      };
      
    const response = await fetch(`${URL}/following`, requestOptions)
    const result = await response.json()
    
    return result
}

export const followers = async () => {
    
    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        }
      };
      
    const response = await fetch(`${URL}/followers`, requestOptions)
    const result = await response.json()
    
    return result
}


export const requests = async () => {
    
    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        }
      };
      
    const response = await fetch(`${URL}/requests`, requestOptions)
    const result = await response.json()
    
    return result
}

export const acceptFollow = async (id) => {
    
    const requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        }
      };
      
    const response = await fetch(`${URL}/follwers/${id}`, requestOptions)
    const result = await response.json()
    
    console.log(result)

}

export const unfollow = async (id) => {

    const requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        }
      }

      const response = await fetch(`${URL}/unfollow/${id}`, requestOptions)
      const result = await response.json()
      
      console.log(result)
    
}