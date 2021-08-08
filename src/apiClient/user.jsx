const URL = "http://localhost:5000"

export const register = async (raw) => {
  

    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(raw),
      redirect: 'follow',
    };
    
    const response = await fetch(`${URL}/register`, requestOptions)
    const user = await response.json()
    if(user.token){
    sendVerificationCode(user.token)
    }
    return {
            ...user.response,
            token:user.token
    }
}

export const checkUserExistense = async (email) => {
 
    var requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
      };
 
      const response = await fetch(`${URL}/user/email?email=${email}`, requestOptions)
      const user = await response.json()
    
      return user
}

export const sendVerificationCode = async (token) => {

  var requestOptions = {
    method: 'POST',
    redirect: 'follow',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': token
     },
    
  };
  
    const response = await fetch(`${URL}/verification`, requestOptions)
    const code =  await response.json()
    console.log(code)
}


export const ConfirmVerification = async (verificationCode,token) => {

  var raw = { code: verificationCode }

  var requestOptions = {
  method: 'POST',
  body: JSON.stringify(raw),
  redirect: 'follow',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': token
   },

};

  const response = await fetch(`${URL}/confirmation`, requestOptions)
  const code = await response.json()

  return code

}