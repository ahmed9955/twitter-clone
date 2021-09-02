import React, { useEffect, useState } from 'react'
import '../../styles/components/post.scss'
import { FavoriteBorder, FavoriteRounded,CommentOutlined, ShareOutlined } from '@material-ui/icons';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setPostDetails, setReplayContent, setTwitterReplayVisibility } from '../../redux/modal/action';
import { connect } from 'react-redux';
import { setLikedPost, setDisLikedPost } from '../../apiClient/post';
import { withRouter } from 'react-router';
import { render } from '@testing-library/react';
import { profile } from '../../apiClient/user';
import commentModal from './comment-modal';

// { profileName,avatar,history,setPostDetails,setReplayContent,user_id,setTwitterReplayVisibility,content,media,likes,comments,id}

class Post extends React.Component {

    constructor(){
        super()
        this.state = {
            flag: false,
            liked: false,
            likesNum: '',
            commentsNum:'',
            likesNumText:0,
            commentsNum:0
        }
    }

   async  componentDidMount(){

        const user = await profile(localStorage.token)
            
        await this.setState({likesNum: this.props.likes})
        await this.setState({commentsNum: this.props.comments.length})
        await this.setState({likesNumText: this.state.likesNum.length})

        if (this.props.user_id.user){
            if (this.state.likesNum.length !== 0){
                if (user){
                    const checkUser =  this.state.likesNum.includes(user._id)
                    if(checkUser){
                        await this.setState({liked: true})
                }
                
        }
}}

}
    
    handleIncreaseComments = async () => {

        await this.setState({commentsNum: this.props.comments.length+1})
    
    }    

    handleComment = (e) => {

        e.stopPropagation();
        const {content,id} = this.props
        
        this.props.setTwitterReplayVisibility(true)

        this.props.setReplayContent({
            post_id: id,
            post_content: content
        })

    }

    handleLike = async (e) => {

        e.stopPropagation();

        
        const like = await setLikedPost(this.props.id)

        if (like.like){

            await this.setState({liked: true})
            await this.setState({likesNumText: this.state.likesNum.length+1})

        } else{

            const dislike = await setDisLikedPost(this.props.id)
            if (dislike.success){
                console.log(dislike)
                await this.setState({liked: false})
                await this.setState({likesNumText: this.state.likesNum.length-1 == -1 ?0:this.state.likesNum.length-1})
              
            }}

       

    }

    handlePostClick = () => {
        this.props.history.push(`/home/post_details`)
        const {

            id, 
            content, 
            media,
            likes,
            profileName,
            avatar,
            comments
        } = this.props
        this.props.setPostDetails({

            id, 
            content, 
            media,
            likes,
            profileName,
            avatar,
            comments
        })
    }

    
render(){

 const { profileName,avatar,history,setPostDetails,setReplayContent,user_id,setTwitterReplayVisibility,content,media,likes,comments,id} = this.props
    return(
        <>
            <div  className="post-container" onClick={this.handlePostClick}>
                <div className="post-owner">
                    <img style={{borderRadius:'50%',marginRight:'10px'}} width='48px' height='48px' src={avatar}/>
                    <span>{profileName}</span>
                </div>
                <input className="post-content" value={content} readOnly />
                {
                media?
                !media.endsWith('.mp4') && media 
                 && 
                    <img
                        src={media} 
                        height='280px' 
                        width='90%'
                        style={{border: '1px solid #cccc',borderRadius:'20px',marginLeft:'40px',marginRight:'40px'}}>
                    </img> : ''
                }
                
                {
                media?
                media.endsWith('.mp4') && 
                
                    <video
                        controls
                        src={media} 
                        height='280px' 
                        width='500px'
                        style={{borderRadius:'20px'}}>
                    </video> : '' 
                }

                <div style={{marginBottom:'20px'}} className = 'post-reactions'>
                   <span onClick={this.handleComment}><CommentOutlined />{this.state.commentsNum}</span>
                   <span><FontAwesomeIcon icon={faRetweet} /> 1</span>
                   <span style = {{ color : this.state.liked  ?'#E44D77': 'black'}} onClick={this.handleLike} >{ this.state.liked ?<FavoriteRounded/>:<FavoriteBorder />}<section>{this.state.likesNumText}</section></span>
                   <span ><ShareOutlined/>0</span>
                   <commentModal  post_content={content} post_id={id}  />
                </div>
            </div>
        </>
    )
}}

const mapStateToProps = state => ({
    user_id: state.user
})

const mapDispatchToProps = dispatch => ({

    setTwitterReplayVisibility: display => dispatch(setTwitterReplayVisibility(display)),
    setReplayContent: content => dispatch(setReplayContent(content)),
    setPostDetails: details => dispatch(setPostDetails(details))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))