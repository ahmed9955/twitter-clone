const URL = "http://localhost:4000/"

export const register = async (raw) => {
  

    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(raw),
      redirect: 'follow',
    };
    
    const response = await fetch("http://localhost:4000/register", requestOptions)
    const user = await response.json()

    console.log(user.response)
}

export const checkUserExistense = async (email) => {
 
    var requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
      };
 
      const response = await fetch(`http://localhost:4000/user/email?email=${email}`, requestOptions)
      const user = await response.json()
    
      return user
}