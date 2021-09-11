import { faCalendarTimes, faClock, faGift, faGlobe, faHandPointDown, faPhoneSquareAlt, faPhotoVideo, faPoll, faSmile, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React ,{useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { createNewPost } from '../../apiClient/post'
import { avatar } from '../../apiClient/user'
import '../../styles/components/create-post.scss'
import TwitterLargeButton from './twitter-large-button'
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import zIndex from '@material-ui/core/styles/zIndex'

const CreatePost = ({ userAvatar, location }) => {

    const [visible,setVisible] = useState(false)
    const [postPic, setPostPic] = useState('')
    const [postVideo, setPostVideo] = useState('')
    const [uploadPostPic, setUploadPostPic] = useState('')
    const [fileName, setFileName] = useState('')
    const [postContent, setPostContent] = useState('')
    const [avatarProfile, setAvatar] = useState('https://pbs.twimg.com/profile_images/1429509461320818689/kAYGSvpx_400x400.png')
    const [displayEmoj, setDisplayEmoj] = useState(false)


    useEffect( async () => {

        if (userAvatar.user){
            
                return setAvatar(userAvatar.user.avatar)
               
        } 
            
        setAvatar('https://pbs.twimg.com/profile_images/1429509461320818689/kAYGSvpx_400x400.png')
            
    })

    const handleFocus = () => {
        setVisible(true)    
    }

    const handleEmojClick = () => {
        setDisplayEmoj(!displayEmoj)
    }

    const onEmojiClick = (event, emojiObject) => {
    
        setPostContent(prev => prev+emojiObject.emoji)    
 
      
      }
    
    const handlePostPic = (e) => {

  
        if (e.target.files[0].type == 'video/mp4'){
            setPostPic('')
            setUploadPostPic(e.target.files[0])        
            setFileName(e.target.files[0].name)
            let reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload =(e) => {
                setPostVideo(e.target.result)
            }    

        } else {
            setUploadPostPic(e.target.files[0])        
            setFileName(e.target.files[0].name)
            setPostVideo('')
            let reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload =(e) => {
                setPostPic(e.target.result)
            }    
        }
        
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (
            postContent === '' 

            ) {
                return
            }
        
        createNewPost(postContent,uploadPostPic,fileName,localStorage.getItem('token'))      
        setPostContent('')
        setPostPic(false)
        setPostVideo(false)
        setVisible(false)
        
        window.location.reload()
    }

   const handleChange = (e) => {
        
        setPostContent(e.target.value)

   }

    return(
        <>

            <form  onSubmit = {handleSubmit} className="create-post-container">
                <div  className="post-content-input">
                <img
                    src={avatarProfile?avatarProfile:'https://pbs.twimg.com/profile_images/1429509461320818689/kAYGSvpx_400x400.png'} 
                    height='48px' 
                    width='48px'
                    style={{border: '1px solid #cccc',borderRadius:'50%'}}>
                </img>
 
                <div style={{display:'flex',flexDirection:'column',width:'80%'}}>
                    <textarea name="content" onChange = {handleChange} value={postContent} onFocus={handleFocus}  className="post-input-field" placeholder="what's happening?" />
                    {
                    location !== 'from-modal' &&
                    <>
                    <div className={visible?'who-see show':'hide'}><span><FontAwesomeIcon icon={faGlobe}/></span><span>Everyone can replay</span></div>
                    <hr className={visible?'show':'hide'}></hr>
                    </>
                    }
                    
                    {
                    postPic && 
                    <img
                    src={postPic} 
                    height='280px' 
                    style={{border: '1px solid #cccc',borderRadius:'20px'}}  width='500px'/> 
                  
                }
                {
                    postVideo && 
                <video
                    controls
                    src={postVideo}
                    height='280px' 
                    width='500px'
                    style={{borderRadius:'20px', marginTop:'20px'}}>
                </video> 
                }   

                    <div className="post-controls">
                    <div className="post-control-icons">
                        <div>
                            <input id="image-post" type='file' accept="audio/*,video/*,image/*" style={{display:'none'}} onChange={handlePostPic}/>
                            { location !== 'from-modal' &&

                            <label style={{cursor:'pointer'}} htmlFor="image-post" onClick = {() => {setPostVideo(true) ;setPostPic(true)}}>
                                <FontAwesomeIcon icon={faPhotoVideo}/>
                            </label>
                            }
                        </div>
                        { location !== 'from-modal' &&
                        <>
                        <div><FontAwesomeIcon icon={faPoll}/></div>
                        <div onClick={handleEmojClick}><FontAwesomeIcon icon={faSmile}/></div>
                        <div><FontAwesomeIcon icon={faClock}/></div>
                        <div></div>


                        </>

}
                         
                    </div>    
                    <div className="tweet-button">
                        <TwitterLargeButton width="150px" type = 'submit'  title="Tweet" />
                    </div>
                </div>
                
                </div>
                
                </div>

            </form>
            <div style={{
                borderRadius: '0',
                position: 'absolute',
                top: '100px',
                left: '220px',
                textAlign: 'center',
                zIndex:'211',
                display: displayEmoj?'block':'none'
                }}>
                
                <Picker  onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK}/>
            
            </div>

        </>
    )
}

const mapStateToProps = (state) => ({
    userAvatar: state.user
})

export default connect(mapStateToProps)(CreatePost)