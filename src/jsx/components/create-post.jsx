import { faCalendarTimes, faClock, faGift, faGlobe, faHandPointDown, faPhoneSquareAlt, faPhotoVideo, faPoll, faSmile, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React ,{useState} from 'react'
import { createNewPost } from '../../apiClient/post'
import '../../styles/components/create-post.scss'
import TwitterLargeButton from './twitter-large-button'

const CreatePost = () => {

    const [visible,setVisible] = useState(false)
    const [postPic, setPostPic] = useState('')
    const [uploadPostPic, setUploadPostPic] = useState('')
    const [fileName, setFileName] = useState('')
    const [postContent, setPostContent] = useState('')

    const handleFocus = () => {
        setVisible(true)    
    }

    const handlePostPic = (e) => {

        setUploadPostPic(e.target.files[0])        
        setFileName(e.target.files[0].name)

        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload =(e) => {
            setPostPic(e.target.result)
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        createNewPost(postContent,uploadPostPic,fileName,localStorage.getItem('token'))      
}

   const handleChange = (e) => {
        
        setPostContent(e.target.value)
   }

    return(
        <>
            <form  onSubmit = {handleSubmit} className="create-post-container">
                <div  className="post-content-input">
                <img
                    src="https://pbs.twimg.com/media/E7-UiXNXEAUVUTd?format=jpg&name=medium" 
                    height='48px' 
                    width='48px'
                    style={{border: '1px solid #cccc',borderRadius:'50%'}}>
                </img>
 
                <div style={{display:'flex',flexDirection:'column',width:'80%'}}>
                    <textarea name="content" onChange = {handleChange} onFocus={handleFocus}  className="post-input-field" placeholder="what's happening?" />
                    <div className={visible?'who-see show':'hide'}><span><FontAwesomeIcon icon={faGlobe}/></span><span>Everyone can replay</span></div>
                    <hr className={visible?'show':'hide'}></hr>
                    {
                    postPic && 
                    <img
                    src={postPic} 
                    height='280px' 
                    width='500px'
                    style={{border: '1px solid #cccc',borderRadius:'20px'}}>
                    </img>
                }
                    

                    <div className="post-controls">
                    <div className="post-control-icons">
                        <div>
                            <input id="image-post" type='file' accept='image/*' style={{display:'none'}} onChange={handlePostPic}/>
                            <label style={{cursor:'pointer'}} htmlFor="image-post">
                                <FontAwesomeIcon icon={faPhotoVideo}/>
                            </label>
                        </div>
                        <div><FontAwesomeIcon icon={faPoll}/></div>
                        <div><FontAwesomeIcon icon={faSmile}/></div>
                        <div><FontAwesomeIcon icon={faClock}/></div>
                        <div></div>
                         
                    </div>    
                    <div className="tweet-button">
                        <TwitterLargeButton type = 'submit'  title="Tweet" />
                    </div>
                </div>
                </div>
                
                </div>

            </form>
        </>
    )
}


export default CreatePost