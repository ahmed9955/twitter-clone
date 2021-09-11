import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import { likedposts } from '../../apiClient/post'
import Post from './post'

const Likes = ({ match }) => {
 
    const [userLikedPosts, setUserLikedPost] = useState([])

    useEffect(async () => {

        const liked = await likedposts(match.params.id)

        setUserLikedPost(liked)

    },[])
 
    return(
        <>
            {
                userLikedPosts.map(post => <Post created_at={post.createdAt} creator = {post.user}  id={post._id} content={post.content} media={post.avatar} comments={post.comments} likes={post.like}  profileName={post.user.profileName} avatar={post.user.avatar} id_user = {post.user._id} /> )
            }

        </>
    )
}

export default withRouter(Likes)