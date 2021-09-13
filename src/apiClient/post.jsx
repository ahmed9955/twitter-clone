import { URL } from "./user";

export const createNewPost = async (content,file,fileName,token) => {

    let formdata = new FormData();

    formdata.append("content", content);

    if (file) {
        formdata.append("postPic", file, fileName)
    } 
    
    
    var requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': token
        },
        body: formdata,
        redirect: 'follow',
    };

 const response = await fetch(`${URL}/post`, requestOptions)
 const post = await response.json()

 console.log(post)
}


export const getUserPosts = async (id) => {
    const requestOptions = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        redirect: 'follow'
      };
      
    const response = await fetch(`${URL}/post/${id}`, requestOptions)
    const posts = await response.json()

    return posts
}

export const getOnePost = async (id) => {
    
    const requestOptions = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
        redirect: 'follow'
      };
    
    const response = await fetch(`${URL}/onepost/${id}`, requestOptions)
    const posts = await response.json()
  
    return posts
  

}


export const newFeeds = async () => {

    const requestOptions = {
        method: 'GET',
        headers: {
          
            "Content-Type": "application/json",
            "Authorization": localStorage.token
        },
        redirect: 'follow'
      };

      const response = await fetch(`${URL}/newposts`, requestOptions)
      const feeds = await response.json()

      return feeds
  
}

export const newFeedsExplore = async () => {

    const requestOptions = {
        method: 'GET',
        headers: {
          
            "Content-Type": "application/json",
            "Authorization": localStorage.token
        },
        redirect: 'follow'
      };

      const response = await fetch(`${URL}/newposts/explore`, requestOptions)
      const feeds = await response.json()

      return feeds
  
}



export const setLikedPost = async (id) => {
    
    const requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: {
            'Authorization': localStorage.token
        }
      };
      
    const response = await fetch(`${URL}/like/${id}`, requestOptions)
    const result = await response.json()

    return result
}

export const setDisLikedPost = async (id) => {
    
    const requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: {
            'Authorization': localStorage.token
        }
      };
      
    const response = await fetch(`${URL}/dislike/${id}`, requestOptions)
    const result = await response.json()

    return result
}

export const getPostLikes = async (id) => {
    const requestOptions = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        redirect: 'follow'
      };
      
    const response = await fetch(`${URL}/post/${id}`, requestOptions)
    const posts = await response.json()

    return posts   

}

export const addReplay =  async (content, id) => {

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

    const response = await fetch(`${URL}/replay/${id}`, requestOptions)
    const result = await response.json()

    console.log(result)
}

export const addComment =  async (content, id) => {
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

    const response = await fetch(`${URL}/comment/${id}`, requestOptions)
    const result = await response.json()

    console.log(result)
}


export const Comments = async (id) => {

    var requestOptions = {
        method: 'GET',
        headers:{

            "Authorization": localStorage.token
        },
        redirect: 'follow'

};

    const response = await fetch(`${URL}/comment/${id}`, requestOptions)
    const result = await response.json()

    return result

}


export const likedposts = async (id) => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'

};

    const response = await fetch(`${URL}/likedposts/${id}`, requestOptions)
    const result = await response.json()

    return result

}

export const mediaposts = async (id) => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'

};

    const response = await fetch(`${URL}/mediaposts/${id}`, requestOptions)
    const result = await response.json()

    return result

}