import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Comments } from '../../apiClient/post'
import { setPostDetails } from '../../redux/modal/action'
import Comment from '../components/comment-component'
import CommentModal from '../components/comment-modal'
import Post from '../components/post'

class PostDetails  extends React.Component {

    constructor(){
        super()
        this.state = {
            postDetails:{},
            comments: []
        }
    }


   async componentDidMount(){
    


    const commentsArray = await Comments(this.props.postDetails.id)        

    this.setState({comments: commentsArray})
    
    console.log(this.props.postDetails)

}

    

render(){
    return(
        <>
        <div style={{display:'flex', flexDirection:'column', }}>
          <Post creator = {this.props.postDetails.creator_id}  {...this.props.postDetails} />
        
          {
              this.state.comments.map(({content, _id,like, replays, user}) =>  <Comment  creator = {user._id}   type= 'comment' likes={like} replays={replays} media = {user.avatar} profileName = {this.props.postDetails}  content= {content} _id={_id} />)
           
          }
        </div>

        <CommentModal  user_avatar = {this.props.replayContent.user_avatar} profileName = {this.props.replayContent.profileName} avatar = {this.props.replayContent.avatar}  post_id = {this.props.replayContent.post_id} post_content={this.props.replayContent.post_content} />   

        </>
    )
}
}

const mapStateToProps = (state) => ({
    postDetails: state.modal.postDetails,
    replayContent: state.modal.replayContent
})

const mapDispatchToProps = (dispath) => ({
    setPostDetails: details => dispath(setPostDetails(details))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)