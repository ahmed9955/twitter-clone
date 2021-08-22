import React from 'react'
import '../../styles/components/post.scss'
import { FavoriteBorder, CommentOutlined, ShareOutlined } from '@material-ui/icons';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Post = () => {

    return(
        <>
            <div className="post-container">
                <div className="post-owner">
                    <img style={{borderRadius:'50%',marginRight:'10px'}} width='48px' height='48px' src="https://pbs.twimg.com/media/E7-UiXNXEAUVUTd?format=jpg&name=medium"/>
                    <span>account name</span>
                </div>
                <div className="post-content">
                    post content
                </div>
                <img
                    src="https://pbs.twimg.com/media/E7-UiXNXEAUVUTd?format=jpg&name=medium" 
                    height='280px' 
                    width='500px'
                    style={{border: '1px solid #cccc',borderRadius:'20px'}}>
                </img>

                {/* <video
                    autoPlay
                    controls
                    src="https://www.w3schools.com/html/mov_bbb.mp4" 
                    height='280px' 
                    width='500px'
                    style={{borderRadius:'20px'}}>
                </video> */}
                <div className = 'post-reactions'>
                   <span><CommentOutlined /></span>
                   <span><FontAwesomeIcon icon={faRetweet} /></span>
                   <span><FavoriteBorder /></span>
                   <span><ShareOutlined/> </span>

                </div>
            </div>
        </>
    )
}

export default Post