import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import { mediaposts } from '../../apiClient/post'
import Post from './post'

const Media = ({ match }) => {

    const [userMediaPosts, setMediaPost] = useState([])

    useEffect(async () => {

        const media = await mediaposts(match.params.id)

        setMediaPost(media)


    },[])

    return(
        <>
            {
                userMediaPosts.map(post => <Post created_at={post.createdAt} creator = {post.user}  id={post._id} content={post.content} media={post.avatar} comments={post.comments} likes={post.like}  profileName={post.user.profileName} avatar={post.user.avatar} id_user = {post.user._id} /> )
            }
 
        </>
    )
}

export default withRouter(Media)