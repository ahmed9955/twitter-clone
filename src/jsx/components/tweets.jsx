import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getUserPosts } from '../../apiClient/post'
import CommentModal from './comment-modal'
import Post from './post'

class Tweets extends React.Component {
    
    constructor(){
        super()
        this.state = {
            userPosts: []
        }
    }
    
    async componentDidMount(){
        const posts = await getUserPosts()
        this.setState({userPosts: posts})
        
    }
        

    render(){
    return(
        <>
        <div>
            {
                this.state.userPosts.map(post => <Post id={post._id} content={post.content} media={post.avatar} comments={post.comments} likes={post.like}  profileName={post.user.profileName} avatar={post.user.avatar} /> )
            }
            <CommentModal  post_id = {this.props.replayContent.post_id} post_content={this.props.replayContent.post_content} />
        </div>
        </>
    )
}}

const mapStateToProps = (state) => ({

    replayContent: state.modal.replayContent

})

export default connect(mapStateToProps)(Tweets)