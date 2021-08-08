import { faCalendarTimes, faClock, faGift, faGlobe, faHandPointDown, faPhoneSquareAlt, faPhotoVideo, faPoll, faSmile, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React ,{useState} from 'react'
import '../../styles/components/create-post.scss'
import TwitterLargeButton from './twitter-large-button'
const CreatePost = () => {
    const [visible,setVisible] = useState(false)
    
    const handleFocus = () => {
        setVisible(true)    
    }

    return(
        <>
            <div className="create-post-container">
                <div  className="post-content-input">
                <img
                    src="https://pbs.twimg.com/media/E7-UiXNXEAUVUTd?format=jpg&name=medium" 
                    height='48px' 
                    width='48px'
                    style={{border: '1px solid #cccc',borderRadius:'50%'}}>
                </img>
                <div style={{display:'flex',flexDirection:'column',width:'80%'}}>
                    <textarea onFocus={handleFocus}  className="post-input-field" placeholder="what's happening?" />
                    <div className={visible?'who-see show':'hide'}><span><FontAwesomeIcon icon={faGlobe}/></span><span>Everyone can replay</span></div>
                    <hr className={visible?'show':'hide'}></hr>
                    <div className="post-controls">
                    <div className="post-control-icons">
                        <div><FontAwesomeIcon icon={faPhotoVideo}/></div>
                        <div><FontAwesomeIcon icon={faPoll}/></div>
                        <div><FontAwesomeIcon icon={faSmile}/></div>
                        <div><FontAwesomeIcon icon={faClock}/></div>
                        <div></div>
                         
                    </div>    
                    <div className="tweet-button">
                        <TwitterLargeButton  title="Tweet" />
                    </div>
                </div>
                </div>
                
                </div>

            </div>
        </>
    )
}

export default CreatePost