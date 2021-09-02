export const URL = "http://localhost:2000"

export const register = async (raw) => {
  

    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(raw),
      redirect: 'follow',
    };
    
    const response = await fetch(`${URL}/register`, requestOptions)
    const user = await response.json()
    console.log(user)
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


export const login = async (email, password) => {

  var raw = {
    email,
    password
  };

  var requestOptions = {
 
    method: 'POST',
    body: JSON.stringify(raw),
    redirect: 'follow',
    headers: { 
      'Content-Type': 'application/json',
     }
  };

 const response = await fetch(`${URL}/login`, requestOptions)
 
 const loggedInUser = await response.json() 

 console.log(loggedInUser)
 
 return loggedInUser
 
}


export const UpdatePasswordAndGender = async (gender, password, token) => {
 
  var raw = {
    gender,
    password
  };

var requestOptions = {
  method: 'PATCH',
  body: JSON.stringify(raw),
  redirect: 'follow',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': token 
  }
};

const response = await fetch(`${URL}/me`, requestOptions)
const update = await response.json()

return update

}


export const profile = async (token) => {


  var requestOptions = {
 
    method: 'GET',
    redirect: 'follow',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': token
     }
  };

 const response = await fetch(`${URL}/me`, requestOptions)
 
 const currentUser = await response.json() 


 return  currentUser
 
}

export const avatar = async (token) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': token
    }
  };
  
  const response = await fetch("http://localhost:2000/avatar", requestOptions)
  const avatar = await response.json()

  return avatar.avatar
}

export const uploadAvatar = async (file, fileName, token) => {
  
  var formdata = new FormData();

  formdata.append("avatar", file, fileName);

  var requestOptions = {
    method: 'POST',
    headers: {
      "Authorization": token
    },
    body: formdata,
    redirect: 'follow'
};

  const response = await fetch("http://localhost:2000/avatar", requestOptions)
  const avatar = await response.json()

  return avatar
}


export const logOut = async () => {
  
  const requestOptions = {
    method: 'POST',
    redirect: 'follow',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': localStorage.token
    }
  };
  
  const response = await fetch(`${URL}/me/logout`, requestOptions)
  const result = await response.json()
  
  return result
}

