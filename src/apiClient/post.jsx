import { URL } from "./user";

export const createNewPost = async (content,file,fileName,token) => {

    let formdata = new FormData();

    formdata.append("content", content);
    formdata.append("postPic", file, fileName);
    
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