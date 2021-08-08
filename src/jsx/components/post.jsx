import React from 'react'
import '../../styles/components/post.scss'

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
            </div>
        </>
    )
}

export default Post