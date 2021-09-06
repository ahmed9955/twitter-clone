import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { newFeeds } from '../../apiClient/post'
import '../../styles/components/tweets-view.scss'
import CommentModal from './comment-modal'
import CreatePost from './create-post'
import Post from './post'

class TweetsView extends React.Component {

    constructor(){
        super()

        this.state = {
            newFeeds: []
        }
    }

    async componentDidMount(){

        const newfeed = await newFeeds()

        await this.setState({newFeeds: newfeed})

        console.log('feeds',this.state.newFeeds)
    }


render(){


    return(
        <>
            <div className='tweets-container'>
                <CreatePost />
                
                {this.state.newFeeds.map(post => <Post id={post._id} content={post.content} media={post.avatar} comments={post.comments} likes={post.like}  profileName={post.user.profileName} avatar={post.user.avatar}/>)}
                
            </div>

            <CommentModal user_avatar = {this.props.replayContent.user_avatar} profileName = {this.props.replayContent.profileName} avatar = {this.props.replayContent.avatar}  post_id = {this.props.replayContent.post_id} post_content={this.props.replayContent.post_content} />   

        </>
    )
}
}

const mapStateToProps = (state) => ({
    replayContent: state.modal.replayContent
})


export default connect(mapStateToProps)(TweetsView)