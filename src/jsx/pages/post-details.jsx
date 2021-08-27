import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Comments } from '../../apiClient/post'
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
          <Post {...this.props.postDetails} />
        
          {
              this.state.comments.map(({content}) =>  <Comment media = {this.props.postDetails.avatar} profileName = {this.props.postDetails.profileName}  content= {content}  />)
           
          }
        </div>
          <CommentModal />   

        </>
    )
}
}

const mapStateToProps = (state) => ({
    postDetails: state.modal.postDetails
})

export default connect(mapStateToProps)(PostDetails)