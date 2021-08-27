import React from 'react'
import '../../styles/components/tweets-view.scss'
import CreatePost from './create-post'
import Post from './post'

const TweetsView = () => {

    return(
        <>
            <div className='tweets-container'>
                <CreatePost />
                {/* <Post/>   */}
            </div>
        </>
    )
}

export default TweetsView